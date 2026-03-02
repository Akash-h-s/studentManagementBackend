// src/handlers/getMessages.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLClient } from 'graphql-request';
import { getMessagesSchema, validateRequest } from '../utils/validationSchemas';
import { withAuth } from '../utils/authMiddleware';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const client = new GraphQLClient(
  process.env.HASURA_ENDPOINT || 'http://host.docker.internal:8085/v1/graphql',
  {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'default_dev_secret',
    },
  }
);

// Helper function to get user info
const getUserInfo = async (userId: number, userType: string) => {
  const table = userType === 'teacher' ? 'teachers' : 'parents';
  const query = `
    query GetUser($id: Int!) {
      ${table}_by_pk(id: $id) {
        id
        name
        email
      }
    }
  `;

  const result: any = await client.request(query, { id: userId });
  const user = result[`${table}_by_pk`];

  return user ? { ...user, role: userType } : null;
};

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  try {
    const { chat_id } = JSON.parse(event.body || '{}');
    const user_id = parseInt(user.id);

    // Validate request
    const validation = validateRequest(getMessagesSchema, { chat_id, user_id });
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: false,
          message: validation.error
        })
      };
    }

    const { chat_id: validatedChatId } = validation.data;

    const query = `
      query GetMessages($chat_id: Int!) {
        messages(
          where: { chat_id: { _eq: $chat_id } }
          order_by: { created_at: asc }
        ) {
          id
          content
          created_at
          sender_id
          sender_type
        }
      }
    `;

    const result: any = await client.request(query, { chat_id: validatedChatId });

    const messages = await Promise.all(result.messages.map(async (msg: any) => {
      const senderInfo = await getUserInfo(msg.sender_id, msg.sender_type);

      return {
        id: msg.id,
        sender_id: msg.sender_id,
        sender_name: senderInfo?.name || 'Unknown',
        content: msg.content,
        timestamp: msg.created_at,
        is_read: false
      };
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        messages
      })
    };
  } catch (error: any) {
    console.error('Error getting messages:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error getting messages',
        error: error.message
      })
    };
  }
});