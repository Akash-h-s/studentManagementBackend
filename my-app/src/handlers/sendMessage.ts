// src/handlers/sendMessage.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLClient } from 'graphql-request';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const client = new GraphQLClient(
  process.env.HASURA_ENDPOINT || 'http://host.docker.internal:8085/v1/graphql',
  {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'myadminsecretkey',
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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const { chat_id, sender_id, sender_type, content } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!chat_id || !sender_id || !sender_type || !content) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: false,
          message: 'Missing required fields: chat_id, sender_id, sender_type, content'
        })
      };
    }

    // Validate sender_type
    if (sender_type !== 'teacher' && sender_type !== 'parent') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: false,
          message: 'Invalid sender_type. Must be "teacher" or "parent"'
        })
      };
    }

    const mutation = `
      mutation SendMessage($chat_id: Int!, $sender_id: Int!, $sender_type: String!, $content: String!) {
        insert_messages_one(
          object: {
            chat_id: $chat_id
            sender_id: $sender_id
            sender_type: $sender_type
            content: $content
          }
        ) {
          id
          content
          created_at
          sender_id
          sender_type
        }
        update_chats_by_pk(
          pk_columns: { id: $chat_id }
          _set: { updated_at: "now()" }
        ) {
          id
        }
      }
    `;

    const result: any = await client.request(mutation, {
      chat_id,
      sender_id,
      sender_type,
      content
    });

    const message = result.insert_messages_one;
    const senderInfo = await getUserInfo(message.sender_id, message.sender_type);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        message: {
          id: message.id,
          sender_id: message.sender_id,
          sender_name: senderInfo?.name || 'Unknown',
          content: message.content,
          timestamp: message.created_at,
          is_read: false
        }
      })
    };
  } catch (error: any) {
    console.error('Error sending message:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error sending message',
        error: error.message
      })
    };
  }
};