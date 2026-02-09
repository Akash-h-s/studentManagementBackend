import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verifyRequestToken, TokenPayload } from './jwtUtils';

export interface AuthenticatedEvent extends APIGatewayProxyEvent {
  user?: TokenPayload;
}

/**
 * Authentication middleware for protected routes
 * Verifies JWT token and attaches user info to event
 */
export const authenticateRequest = (
  authHeader?: string
): { authenticated: boolean; user?: TokenPayload; error?: string } => {
  if (!authHeader) {
    return {
      authenticated: false,
      error: 'Missing Authorization header',
    };
  }

  const tokenPayload = verifyRequestToken(authHeader);
  if (!tokenPayload) {
    return {
      authenticated: false,
      error: 'Invalid or expired token',
    };
  }

  return {
    authenticated: true,
    user: tokenPayload,
  };
};

/**
 * Create unauthorized response
 */
export const unauthorizedResponse = (corsHeaders: any, message: string = 'Unauthorized'): APIGatewayProxyResult => {
  return {
    statusCode: 401,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify({
      success: false,
      message,
    }),
  };
};

/**
 * Create forbidden response
 */
export const forbiddenResponse = (corsHeaders: any, message: string = 'Forbidden'): APIGatewayProxyResult => {
  return {
    statusCode: 403,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify({
      success: false,
      message,
    }),
  };
};
