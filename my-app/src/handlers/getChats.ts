// src/handlers/getChats.ts
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
    const { user_id } = JSON.parse(event.body || '{}');

    if (!user_id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: false,
          message: 'Missing required field: user_id'
        })
      };
    }

    const query = `
      query GetChats($user_id: Int!) {
        chats(
          where: {
            chat_participants: {
              user_id: { _eq: $user_id }
            }
          }
          order_by: { updated_at: desc }
        ) {
          id
          type
          name
          chat_participants {
            user_id
            user_type
          }
          messages(order_by: { created_at: desc }, limit: 1) {
            id
            content
            created_at
            sender_id
            sender_type
          }
        }
      }
    `;

    const result: any = await client.request(query, { user_id });

    const chats = await Promise.all(result.chats.map(async (chat: any) => {
      let chatName = chat.name;
      
      // Get participant details
      const participantsList = [];
      for (const p of chat.chat_participants) {
        const userInfo = await getUserInfo(p.user_id, p.user_type);
        if (userInfo) participantsList.push(userInfo);
      }
      
      // For direct chats, use the other person's name
      if (chat.type === 'direct') {
        const otherUser = participantsList.find((u: any) => u.id !== user_id);
        chatName = otherUser?.name || 'Unknown User';
      }

      // Get sender info for last message
      let lastMessage = null;
      if (chat.messages[0]) {
        const senderInfo = await getUserInfo(
          chat.messages[0].sender_id,
          chat.messages[0].sender_type
        );
        
        lastMessage = {
          id: chat.messages[0].id,
          sender_id: chat.messages[0].sender_id,
          sender_name: senderInfo?.name || 'Unknown',
          content: chat.messages[0].content,
          timestamp: chat.messages[0].created_at,
          is_read: false
        };
      }

      return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        participants: participantsList,
        last_message: lastMessage,
        unread_count: 0 // TODO: Implement unread count logic
      };
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        chats
      })
    };
  } catch (error: any) {
    console.error('Error getting chats:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error getting chats',
        error: error.message
      })
    };
  }
};