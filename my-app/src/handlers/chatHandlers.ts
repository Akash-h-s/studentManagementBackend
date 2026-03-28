// src/handlers/chatHandlers.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChatService } from '../services/chatService';
import { ParentService } from '../services/parentService';
import { successResponse, errorResponse, optionsResponse } from '../utils/apiResponse';

// GET CHATS HANDLER
export const getChatsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const { user_id } = JSON.parse(event.body || '{}');
    const chats = await ChatService.getChats(user_id);

    return successResponse({ chats });
  } catch (error: any) {
    console.error('Error getting chats:', error);
    return errorResponse('Error getting chats', 500, error);
  }
};

// GET MESSAGES HANDLER
export const getMessagesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const { chat_id } = JSON.parse(event.body || '{}');
    const messages = await ChatService.getMessages(chat_id);

    return successResponse({ messages });
  } catch (error: any) {
    console.error('Error getting messages:', error);
    return errorResponse('Error getting messages', 500, error);
  }
};

// SEND MESSAGE HANDLER
export const sendMessageHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const { chat_id, sender_id, content } = JSON.parse(event.body || '{}');
    const message = await ChatService.sendMessage(chat_id, sender_id, content);

    return successResponse({ message });
  } catch (error: any) {
    console.error('Error sending message:', error);
    return errorResponse('Error sending message', 500, error);
  }
};

// GET ALL PARENTS HANDLER
export const getAllParentsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return optionsResponse();
  }

  try {
    const parents = await ParentService.getAllParents();
    return successResponse({ parents });
  } catch (error: any) {
    console.error('Error getting parents:', error);
    return errorResponse('Error getting parents', 500, error);
  }
};
