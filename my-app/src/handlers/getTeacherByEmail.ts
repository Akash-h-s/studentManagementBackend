// src/handlers/getTeacherByEmail.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { gqlSdk } from '../config/graphClient';
import { getTeacherByEmailSchema, validateRequest } from '../utils/validationSchemas';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email } = body;

    // Validate request
    const validation = validateRequest(getTeacherByEmailSchema, { email });
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: validation.error,
        }),
      };
    }

    const validatedEmail = validation.data.email;

    // Fetch teacher from database
    const result = await gqlSdk.GetTeacherIdByEmail({ 
      email: validatedEmail.trim() 
    });

    if (!result.teachers || result.teachers.length === 0) {
      return {
        statusCode: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: 'Teacher not found',
        }),
      };
    }

    const teacher = result.teachers[0];

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        teacher: {
          id: teacher.id,
          email: teacher.email,
          name: teacher.name,
        },
      }),
    };
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};