// src/handlers/fetchStudents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sdk } from '../lib/graphqlClient';

interface FetchStudentsRequest {
  class_name: string;
  section_name: string;
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
    const { class_name, section_name } = body;

    console.log('Fetching students for:', { class_name, section_name });

    if (!class_name || !section_name) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          success: false,
          message: 'Class name and section name are required',
        }),
      };
    }

    // Use generated SDK query
    const result = await sdk.GetStudentsByClassSection({
      class_name: class_name.trim(),
      section_name: section_name.trim(),
    });

    console.log('Found students:', result.students.length);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({
        success: true,
        count: result.students.length,
        class_name,
        section_name,
        students: result.students,
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