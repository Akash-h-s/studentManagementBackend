
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
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'default_dev_secret',
    },
  }
);

// GET CHATS HANDLER
export const getChatsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const { user_id } = JSON.parse(event.body || '{}');

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
            user {
              id
              name
              email
            }
          }
          messages(order_by: { created_at: desc }, limit: 1) {
            id
            content
            created_at
            sender {
              id
              name
            }
          }
        }
      }
    `;

    const result: any = await client.request(query, { user_id });

    const chats = result.chats.map((chat: any) => {
      let chatName = chat.name;

      // For direct chats, use the other person's name
      if (chat.type === 'direct') {
        const otherUser = chat.chat_participants.find((p: any) => p.user.id !== user_id)?.user;
        chatName = otherUser?.name || 'Unknown User';
      }

      return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        participants: chat.chat_participants.map((p: any) => p.user),
        last_message: chat.messages[0] ? {
          id: chat.messages[0].id,
          sender_id: chat.messages[0].sender.id,
          sender_name: chat.messages[0].sender.name,
          content: chat.messages[0].content,
          timestamp: chat.messages[0].created_at,
          is_read: false
        } : null,
        unread_count: 0 // TODO: Implement unread count logic
      };
    });

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

// GET MESSAGES HANDLER
export const getMessagesHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const { chat_id, user_id } = JSON.parse(event.body || '{}');

    const query = `
      query GetMessages($chat_id: Int!) {
        messages(
          where: { chat_id: { _eq: $chat_id } }
          order_by: { created_at: asc }
        ) {
          id
          content
          created_at
          sender {
            id
            name
          }
        }
      }
    `;

    const result: any = await client.request(query, { chat_id });

    const messages = result.messages.map((msg: any) => ({
      id: msg.id,
      sender_id: msg.sender.id,
      sender_name: msg.sender.name,
      content: msg.content,
      timestamp: msg.created_at,
      is_read: false
    }));

    // TODO: Mark messages as read
    // const markReadMutation = `
    //   mutation MarkMessagesRead($chat_id: Int!, $user_id: Int!) {
    //     update_messages(
    //       where: {
    //         chat_id: { _eq: $chat_id }
    //         sender_id: { _neq: $user_id }
    //       }
    //       _set: { is_read: true }
    //     ) {
    //       affected_rows
    //     }
    //   }
    // `;

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
};

// SEND MESSAGE HANDLER
export const sendMessageHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const { chat_id, sender_id, content } = JSON.parse(event.body || '{}');

    const mutation = `
      mutation SendMessage($chat_id: Int!, $sender_id: Int!, $content: String!) {
        insert_messages_one(
          object: {
            chat_id: $chat_id
            sender_id: $sender_id
            content: $content
          }
        ) {
          id
          content
          created_at
          sender {
            id
            name
          }
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
      content
    });

    const message = result.insert_messages_one;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        message: {
          id: message.id,
          sender_id: message.sender.id,
          sender_name: message.sender.name,
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

// GET ALL PARENTS HANDLER
export const getAllParentsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const query = `
      query GetAllParents {
        parents(order_by: { name: asc }) {
          id
          name
          email
          students {
            name
          }
        }
      }
    `;

    const result: any = await client.request(query);

    const parents = result.parents.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: 'parent',
      student_name: p.students?.[0]?.name || null
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        parents
      })
    };
  } catch (error: any) {
    console.error('Error getting parents:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error getting parents',
        error: error.message
      })
    };
  }
};