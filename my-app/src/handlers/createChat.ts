// src/handlers/createChat.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createChatSchema, validateRequest } from '../utils/validationSchemas';
import { withAuth } from '../utils/authMiddleware';
import { ChatService } from '../services/chatService';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validation = validateRequest(createChatSchema, body);

    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request body', 400);
    }

    const { type, participants, name, members } = validation.data;

    if (type === 'direct') {
      if (!participants || participants.length !== 2) {
        return errorResponse('Direct chat requires exactly 2 participants', 400);
      }

      const user1 = typeof participants[0] === 'object' ? participants[0].user_id : participants[0];
      const user2 = typeof participants[1] === 'object' ? participants[1].user_id : participants[1];
      const user1Type = typeof participants[0] === 'object' ? participants[0].user_type : 'teacher';
      const user2Type = typeof participants[1] === 'object' ? participants[1].user_type : 'parent';

      // Check if direct chat already exists
      let chat = await ChatService.findExistingDirectChat(user1, user2);

      if (!chat) {
        chat = await ChatService.createDirectChat(user1, user1Type, user2, user2Type);
      }

      const chatDetails = await ChatService.getChatDetails(chat, user1);
      return successResponse({ chat: chatDetails });

    } else if (type === 'group') {
      if (!name || !members || members.length < 2) {
        return errorResponse('Group chat requires name and at least 2 members', 400);
      }

      const chat = await ChatService.createGroupChat(name, members);
      const chatDetails = await ChatService.getChatDetails(chat, members[0]?.user_id || 0);
      return successResponse({ chat: chatDetails });
    }

    return errorResponse('Invalid chat type. Must be "direct" or "group"', 400);
  } catch (error: any) {
    console.error('Error in createChat handler:', error);
    return errorResponse('Error creating chat', 500, error);
  }
});
