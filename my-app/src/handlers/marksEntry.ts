// src/handlers/marksEntry.ts
// SIMPLIFIED VERSION - Works without JWT authentication
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { gqlSdk } from '../config/graphClient';
import { calculateGrade, validateMarksEntry } from '../utils/validators';

// Types for request
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

// CORS headers constant
const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Find or create class section
const findOrCreateClassSection = async (
  className: string,
  sectionName: string
): Promise<number> => {
  try {
    const result = await gqlSdk.InsertClassSection({
      object: { 
        class_name: className.trim(), 
        section_name: sectionName.trim() 
      }
    });

    if (!result.insert_class_sections_one?.id) {
      throw new Error('Failed to create/find class section');
    }

    return result.insert_class_sections_one.id;
  } catch (error) {
    console.error('Error in findOrCreateClassSection:', error);
    throw error;
  }
};

// Find or create subject
const findOrCreateSubject = async (
  subjectName: string,
  className: string,
  teacherId: number
): Promise<number> => {
  try {
    // First, try to find existing subject
    const findResult = await gqlSdk.FindSubject({
      name: subjectName.trim(),
      class_name: className.trim(),
    });

    if (findResult.subjects.length > 0) {
      return findResult.subjects[0].id;
    }

    // If not found, create new subject
    const createResult = await gqlSdk.CreateSubject({
      name: subjectName.trim(),
      class_name: className.trim(),
      teacher_id: teacherId,
    });

    if (!createResult.insert_subjects_one?.id) {
      throw new Error('Failed to create subject');
    }

    return createResult.insert_subjects_one.id;
  } catch (error) {
    console.error('Error in findOrCreateSubject:', error);
    throw error;
  }
};

// Find or create exam
const findOrCreateExam = async (
  examName: string,
  academicYear: string
): Promise<number> => {
  try {
    // First, try to find existing exam
    const findResult = await gqlSdk.FindExam({
      name: examName.trim(),
      academic_year: academicYear.trim(),
    });

    if (findResult.exams.length > 0) {
      return findResult.exams[0].id;
    }

    // If not found, create new exam
    const createResult = await gqlSdk.CreateExam({
      name: examName.trim(),
      academic_year: academicYear.trim(),
    });

    if (!createResult.insert_exams_one?.id) {
      throw new Error('Failed to create exam');
    }

    return createResult.insert_exams_one.id;
  } catch (error) {
    console.error('Error in findOrCreateExam:', error);
    throw error;
  }
};

// Save/Update marks to database using UPSERT
const saveMarksToDatabase = async (marksEntries: MarkEntryRequest[]) => {
  try {
    // Get first entry to extract common data
    const firstEntry = marksEntries[0];

    // Find or create class_section, subject, and exam
    const classSectionId = await findOrCreateClassSection(
      firstEntry.class_name,
      firstEntry.section_name
    );

    const subjectId = await findOrCreateSubject(
      firstEntry.subject_name,
      firstEntry.class_name,
      firstEntry.teacher_id
    );

    const examId = await findOrCreateExam(
      firstEntry.exam_name,
      firstEntry.academic_year
    );

    console.log('IDs resolved:', { classSectionId, subjectId, examId });

    // Prepare marks objects for insertion/update
    const marksObjects = marksEntries.map(mark => ({
      student_id: mark.student_id,
      subject_id: subjectId,
      exam_id: examId,
      teacher_id: mark.teacher_id,
      marks_obtained: mark.marks_obtained,
      max_marks: mark.max_marks,
      grade: mark.grade || calculateGrade(mark.marks_obtained, mark.max_marks),
      remarks: mark.remarks || null,
      is_finalized: mark.is_finalized,
    }));

    // Use UPSERT to insert or update existing marks
    // This will INSERT new records or UPDATE existing ones
    const result = await gqlSdk.UpsertMarks({
      objects: marksObjects,
      on_conflict: {
        constraint: 'marks_student_subject_exam_key',
        update_columns: ['marks_obtained', 'grade', 'remarks', 'max_marks', 'teacher_id', 'is_finalized', 'updated_at']
      }
    });

    return {
      affected_rows: result.insert_marks?.affected_rows || 0,
      returning: result.insert_marks?.returning || [],
    };
  } catch (error) {
    console.error('Error in saveMarksToDatabase:', error);
    throw error;
  }
};

// Lambda handler
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  try {
    const body: SaveMarksRequest = JSON.parse(event.body || '{}');
    const action = body.action || 'validate';
    const marksEntries = body.data?.marks || [];

    console.log('Processing marks entry request');
    console.log('Action:', action);
    console.log('Number of marks entries:', marksEntries.length);

    if (!marksEntries || marksEntries.length === 0) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: 'No marks entries provided',
        }),
      };
    }

    // Log teacher_id for debugging
    if (marksEntries.length > 0) {
      console.log('Teacher ID from request:', marksEntries[0].teacher_id);
    }

    // Validate all entries
    const validationErrors: ValidationError[] = [];
    const validEntries: MarkEntryRequest[] = [];

    marksEntries.forEach((mark, index) => {
      const validation = validateMarksEntry(mark);

      if (!validation.valid) {
        validationErrors.push({
          index,
          student_id: mark.student_id,
          errors: validation.errors,
        });
      } else {
        // Auto-calculate grade if not provided
        if (!mark.grade) {
          mark.grade = calculateGrade(mark.marks_obtained, mark.max_marks);
        }
        validEntries.push(mark);
      }
    });

    // If validation action
    if (action === 'validate') {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: validationErrors.length === 0,
          total_entries: marksEntries.length,
          valid_entries: validEntries.length,
          invalid_entries: validationErrors.length,
          errors: validationErrors,
          validated_data: validEntries,
        }),
      };
    }

    // If save action
    if (action === 'save' || action === 'bulk_save') {
      if (validationErrors.length > 0) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            success: false,
            message: 'Validation failed',
            errors: validationErrors,
          }),
        };
      }

      // Save/Update to database
      const result = await saveMarksToDatabase(validEntries);

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          message: `Successfully saved/updated marks for ${result.affected_rows} students`,
          affected_rows: result.affected_rows,
          data: result.returning,
          summary: {
            total_students: validEntries.length,
            average_marks:
              validEntries.reduce((sum, m) => sum + m.marks_obtained, 0) /
              validEntries.length,
            highest_marks: Math.max(...validEntries.map(m => m.marks_obtained)),
            lowest_marks: Math.min(...validEntries.map(m => m.marks_obtained)),
          },
        }),
      };
    }

    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: `Unknown action: ${action}`,
      }),
    };
  } catch (error) {
    console.error('Error in lambda handler:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }),
    };
  }
};