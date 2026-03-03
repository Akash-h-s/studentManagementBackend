// src/handlers/fetchStudents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sdk } from '../lib/graphqlClient';
import { fetchStudentsSchema, validateRequest } from '../utils/validationSchemas';
import { withAuth } from '../utils/authMiddleware';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

interface FetchStudentsRequest {
  class_name: string;
  section_name: string;
  subject_id?: number;
  exam_id?: number;
}

export const handler = withAuth(async (
  event: APIGatewayProxyEvent,
  user
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const body: FetchStudentsRequest = JSON.parse(event.body || '{}');

    // Validate request
    const validation = validateRequest(fetchStudentsSchema, body);
    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request', 400);
    }

    let { class_name, section_name, subject_id, exam_id } = validation.data;

    // Use generated SDK query
    let result = await sdk.GetStudentsByClassSection({
      class_name: class_name.trim(),
      section_name: section_name.trim(),
    });

    // Fallback logic for combined class-section strings (e.g. "10-A") or when section is empty
    if (result.students.length === 0 && (!section_name || !section_name.trim()) && class_name.trim().includes('-')) {
      const parts = class_name.trim().split('-');
      const potentialSection = parts.pop();
      const potentialClass = parts.join('-');

      if (potentialClass && potentialSection) {
        try {
          const fallbackResult = await sdk.GetStudentsByClassSection({
            class_name: potentialClass,
            section_name: potentialSection
          });

          if (fallbackResult.students.length > 0) {
            result = fallbackResult;
            class_name = potentialClass;
            section_name = potentialSection;
          }
        } catch (err) {
          console.warn('Fallback query failed:', err);
        }
      }
    }

    let studentsToReturn: any[] = result.students;

    // If subject and exam provided, fetch existing marks and annotate/sort
    if (subject_id && exam_id && studentsToReturn.length > 0) {
      try {
        const studentIds = studentsToReturn.map((s) => s.id);
        const marksRes = await sdk.GetExistingMarks({
          student_ids: studentIds,
          subject_id,
          exam_id,
        });

        const markMap = new Map<number, boolean>();
        (marksRes.marks || []).forEach((m) => {
          if (m.student_id != null) markMap.set(m.student_id, Boolean(m.is_finalized));
        });

        // annotate pending (true if no mark or not finalized)
        studentsToReturn = studentsToReturn.map((s) => ({
          ...s,
          pending: !(markMap.get(s.id) === true),
        }));

        // put pending first
        studentsToReturn.sort((a, b) => {
          if (a.pending === b.pending) return 0;
          return a.pending ? -1 : 1;
        });
      } catch (err) {
        console.error('Error fetching existing marks:', err);
      }
    }

    return successResponse({
      count: studentsToReturn.length,
      class_name,
      section_name,
      students: studentsToReturn,
    });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return errorResponse('Internal server error', 500, error);
  }
});
