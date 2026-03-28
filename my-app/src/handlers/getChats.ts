// src/handlers/getChats.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getChatsSchema, validateRequest } from '../utils/validationSchemas';
import { withAuth } from '../utils/authMiddleware';
import { ChatService } from '../services/chatService';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validation = validateRequest(getChatsSchema, body);

    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request', 400);
    }

    const user_id = parseInt(user.id);
    const chats = await ChatService.getChats(user_id);

    return successResponse({ chats });
  } catch (error: any) {
    console.error('Error getting chats:', error);
    return errorResponse('Error getting chats', 500, error);
  }
});
