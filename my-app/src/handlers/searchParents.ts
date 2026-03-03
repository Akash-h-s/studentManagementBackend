// src/handlers/searchParents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { searchParentsSchema, validateRequest } from '../utils/validationSchemas';
import { withAuth } from '../utils/authMiddleware';
import { ParentService } from '../services/parentService';
import { ChatService } from '../services/chatService';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { search_query, current_user_id } = body;

    // Validate request
    const validation = validateRequest(searchParentsSchema, { search_query });
    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request', 400);
    }

    const searchQuery = validation.data.search_query;
    let parents = searchQuery
      ? await ParentService.searchParents(searchQuery)
      : await ParentService.getAllParents();

    // Attach existing direct chat id when present
    if (current_user_id) {
      for (const p of (parents as any[])) {
        try {
          const chat = await ChatService.findExistingDirectChat(current_user_id, p.id);
          if (chat) p.chat_id = chat.id;
        } catch (err: any) {
          console.warn('chat lookup failed for parent', p.id, err?.message);
        }
      }
    }

    return successResponse({ parents });
  } catch (error: any) {
    console.error('Error searching parents:', error);
    return errorResponse('Error searching parents', 500, error);
  }
});
