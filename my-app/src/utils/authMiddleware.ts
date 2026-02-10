import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verifyRequestToken, TokenPayload } from './jwtUtils';

export type AuthenticatedHandler = (
  event: APIGatewayProxyEvent,
  user: TokenPayload
) => Promise<APIGatewayProxyResult>;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Middleware to validate JWT token and inject user payload into handler
 */
export const withAuth = (handler: AuthenticatedHandler) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'CORS preflight' }),
      };
    }

    const authHeader = event.headers.Authorization || event.headers.authorization;
    const user = verifyRequestToken(authHeader);

    if (!user) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          success: false,
          message: 'Unauthorized: Invalid or missing token',
        }),
      };
    }

    try {
      return await handler(event, user);
    } catch (error) {
      console.error('Handler error:', error);
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
};
