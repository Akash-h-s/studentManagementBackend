import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { gqlSdk } from '../config/graphClient';
import { marksEntrySchema, validateRequest } from '../utils/validationSchemas';
import { verifyRequestToken } from '../utils/jwtUtils';

/**
 * UTILS & VALIDATORS
 * (Defined here for a single-file solution, though usually imported)
 */
const calculateGrade = (obtained: number, max: number): string => {
  const percentage = (obtained / max) * 100;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

const validateMarksEntry = (entry: MarkEntryRequest) => {
  const errors: string[] = [];
  if (entry.marks_obtained > entry.max_marks) {
    errors.push('Marks obtained cannot be greater than maximum marks');
  }
  if (entry.marks_obtained < 0) {
    errors.push('Marks cannot be negative');
  }
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * TYPES
 */
interface MarkEntryRequest {
  student_id: number;
  subject_name: string;
  exam_name: string;
  class_name: string;
  section_name: string;
  academic_year: string;
  teacher_id: number;
  marks_obtained: number;
  max_marks: number;
  grade?: string;
  remarks?: string;
  is_finalized: boolean;
}

interface SaveMarksRequest {
  action: 'validate' | 'save' | 'bulk_save';
  data: {
    marks: MarkEntryRequest[];
  };
}

interface ValidationError {
  index: number;
  student_id?: number;
  errors: string[];
}

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * HELPER LOGIC
 */

// Simple JWT decoder (no verification for local dev)
const extractTeacherIdFromToken = (event: APIGatewayProxyEvent): number | null => {
  try {
    const authHeader = event.headers['Authorization'] || event.headers['authorization'];
    if (!authHeader) return null;

    const tokenPayload = verifyRequestToken(authHeader);
    if (!tokenPayload) return null;
    
    return parseInt(tokenPayload.id, 10);
  } catch (error) {
    console.error('Token extraction failed:', error);
    return null;
  }
};

const findOrCreateClassSection = async (className: string, sectionName: string): Promise<number> => {
  const result = await gqlSdk.InsertClassSection({
    object: { class_name: className.trim(), section_name: sectionName.trim() }
  });
  if (!result.insert_class_sections_one?.id) throw new Error('ClassSection ID resolution failed');
  return result.insert_class_sections_one.id;
};

const findOrCreateSubject = async (name: string, className: string, teacherId: number): Promise<number> => {
  const normalized = name.trim().toLowerCase();
  const classNorm = className.trim();
  const findResult = await gqlSdk.FindSubject({ name: normalized, class_name: classNorm });
  if (findResult.subjects.length > 0) return findResult.subjects[0].id;

  const createResult = await gqlSdk.CreateSubject({ name: normalized, class_name: classNorm, teacher_id: teacherId });
  if (!createResult.insert_subjects_one?.id) throw new Error('Subject creation failed');
  return createResult.insert_subjects_one.id;
};

const findOrCreateExam = async (name: string, year: string): Promise<number> => {
  const findResult = await gqlSdk.FindExam({ name: name.trim(), academic_year: year.trim() });
  if (findResult.exams.length > 0) return findResult.exams[0].id;

  const createResult = await gqlSdk.CreateExam({ name: name.trim(), academic_year: year.trim() });
  if (!createResult.insert_exams_one?.id) throw new Error('Exam creation failed');
  return createResult.insert_exams_one.id;
};

/**
 * MAIN HANDLER
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  try {
    const teacherId = extractTeacherIdFromToken(event);
    if (!teacherId) {
      return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ message: 'Unauthorized' }) };
    }

    const body: SaveMarksRequest = JSON.parse(event.body || '{}');
    const { action = 'validate', data } = body;
    const marksEntries = data?.marks || [];

    if (marksEntries.length === 0) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ message: 'No data' }) };
    }

    // 1. Validation
    const validationErrors: ValidationError[] = [];
    const validEntries = marksEntries.map((mark, index) => {
      mark.teacher_id = teacherId; // Force security
      // Normalize subject to lowercase for consistent lookup/storage
      if (mark.subject_name) mark.subject_name = mark.subject_name.trim().toLowerCase();
      if (mark.class_name) mark.class_name = mark.class_name.trim();
      if (mark.exam_name) mark.exam_name = mark.exam_name.trim();

      const v = validateMarksEntry(mark);
      if (!v.valid) validationErrors.push({ index, student_id: mark.student_id, errors: v.errors });
      if (!mark.grade) mark.grade = calculateGrade(mark.marks_obtained, mark.max_marks);
      return mark;
    });

    // If caller asked only to validate, or there are validation errors,
    // return validation results. Simplified to avoid TypeScript unintended
    // comparison warnings between disjoint union members.
    if (action === 'validate' || validationErrors.length > 0) {
      return {
        statusCode: validationErrors.length > 0 ? 400 : 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: validationErrors.length === 0, errors: validationErrors, valid_count: validEntries.length - validationErrors.length })
      };
    }

    // 2. Resolve Relationships (Using first entry for metadata)
    const first = validEntries[0];
    const subjectId = await findOrCreateSubject(first.subject_name, first.class_name, teacherId);
    const examId = await findOrCreateExam(first.exam_name, first.academic_year);

    // 3. Prepare objects for the original mutation (objects only)
    const marksObjects = validEntries.map(m => ({
      student_id: m.student_id,
      subject_id: subjectId,
      exam_id: examId,
      teacher_id: teacherId,
      marks_obtained: m.marks_obtained,
      max_marks: m.max_marks,
      grade: m.grade,
      remarks: m.remarks || null,
      is_finalized: m.is_finalized
    }));

    // 4. Final Insert
    const result = await gqlSdk.InsertMarks({ objects: marksObjects });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        affected_rows: result.insert_marks?.affected_rows,
        data: result.insert_marks?.returning
      })
    };

  } catch (error: any) {
    console.error('Handler Error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};