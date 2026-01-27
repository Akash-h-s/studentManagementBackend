import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sdk } from '../lib/graphqlClient';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('=== GET STUDENT DETAILS ===');
  console.log('Method:', event.httpMethod);
  console.log('Body:', event.body);
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { parentId, studentId } = body.input || body;

    console.log('Parent ID:', parentId);
    console.log('Student ID:', studentId);

    if (studentId) {
      const result = await sdk.GetStudentById({ id: studentId });
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          data: result.students_by_pk ? [result.students_by_pk] : [],
        }),
      };
    } else if (parentId) {
      const result = await sdk.GetStudentsByParentId({ parentId });
      console.log('Found students:', result.students.length);

      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          data: result.students,
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Parent ID or Student ID required',
        }),
      };
    }
  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: error.message || 'Internal error',
      }),
    };
  }
};