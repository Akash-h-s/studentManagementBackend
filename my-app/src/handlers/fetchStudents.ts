// src/handlers/fetchStudents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sdk } from '../lib/graphqlClient';
import { fetchStudentsSchema, validateRequest } from '../utils/validationSchemas';

interface FetchStudentsRequest {
  class_name: string;
  section_name: string;
  subject_id?: number;
  exam_id?: number;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Event method:', event.httpMethod);
  console.log('Event path:', event.path);
  
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'CORS preflight' }),
    };
  }

  try {
    const body: FetchStudentsRequest = JSON.parse(event.body || '{}');
    
    // Validate request
    const validation = validateRequest(fetchStudentsSchema, body);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          success: false,
          message: validation.error,
        }),
      };
    }

    const { class_name, section_name, subject_id, exam_id } = validation.data;

    // Use generated SDK query
    const result = await sdk.GetStudentsByClassSection({
      class_name: class_name.trim(),
      section_name: section_name.trim(),
    });

    console.log('Found students:', result.students.length);

    let studentsToReturn = result.students;

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({
        success: true,
        count: studentsToReturn.length,
        class_name,
        section_name,
        students: studentsToReturn,
      }),
    };
  } catch (error) {
    console.error('Error fetching students:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};