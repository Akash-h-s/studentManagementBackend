// src/handlers/marksEntry.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { withAuth } from '../utils/authMiddleware';
import { calculateGrade } from '../utils/gradeUtils';
import { validateMarksEntry, MarkEntryRequest } from '../validators/marksValidator';
import { MarksService } from '../services/marksService';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

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

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const teacherId = parseInt(user.id, 10);
    if (isNaN(teacherId)) {
      return errorResponse('Invalid Teacher ID in token', 401);
    }

    const body: SaveMarksRequest = JSON.parse(event.body || '{}');
    const { action = 'validate', data } = body;
    const marksEntries = data?.marks || [];

    if (marksEntries.length === 0) {
      return errorResponse('No data provided', 400);
    }

    // 1. Validation & Data Normalization
    const validationErrors: ValidationError[] = [];
    const normalizedEntries = marksEntries.map((mark, index) => {
      mark.teacher_id = teacherId; // Force security
      if (mark.subject_name) mark.subject_name = mark.subject_name.trim().toLowerCase();
      if (mark.class_name) mark.class_name = mark.class_name.trim();
      if (mark.exam_name) mark.exam_name = mark.exam_name.trim();

      const v = validateMarksEntry(mark);
      if (!v.valid) {
        validationErrors.push({ index, student_id: mark.student_id, errors: v.errors });
      }

      if (!mark.grade) {
        mark.grade = calculateGrade(mark.marks_obtained, mark.max_marks);
      }
      return mark;
    });

    if (action === 'validate' || validationErrors.length > 0) {
      return successResponse({
        success: validationErrors.length === 0,
        errors: validationErrors,
        valid_count: normalizedEntries.length - validationErrors.length
      }, validationErrors.length > 0 ? 400 : 200);
    }

    // 2. Resolve Relationships (Using first entry for metadata)
    const first = normalizedEntries[0];
    const subjectId = await MarksService.findOrCreateSubject(first.subject_name, first.class_name, teacherId);
    const examId = await MarksService.findOrCreateExam(first.exam_name, first.academic_year);

    // 3. Prepare objects for mutation
    const marksObjects = normalizedEntries.map(m => ({
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
    const result = await MarksService.saveMarks(marksObjects);

    return successResponse({
      affected_rows: result.insert_marks?.affected_rows,
      data: result.insert_marks?.returning
    });

  } catch (error: any) {
    console.error('Marks Entry Handler Error:', error);
    return errorResponse(error.message || 'Internal server error', 500, error);
  }
});
