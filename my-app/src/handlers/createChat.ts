// src/handlers/createChat.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLClient } from 'graphql-request';
import { createChatSchema, validateRequest } from '../utils/validationSchemas';

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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Received body:', JSON.stringify(body, null, 2)); // Debug log

    // Validate request
    const validation = validateRequest(createChatSchema, body);
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

    const { type, participants, name, created_by, members } = validation.data;

    if (type === 'direct') {
      if (!participants || participants.length !== 2) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          body: JSON.stringify({
            success: false,
            message: 'Direct chat requires exactly 2 participants with format: [{user_id: number, user_type: string}]'
          })
        };
      }

      // Extract user_id and user_type properly
      const user1 = typeof participants[0] === 'object' ? participants[0].user_id : participants[0];
      const user2 = typeof participants[1] === 'object' ? participants[1].user_id : participants[1];
      const user1Type = typeof participants[0] === 'object' ? participants[0].user_type : 'teacher';
      const user2Type = typeof participants[1] === 'object' ? participants[1].user_type : 'parent';

      console.log('Checking for existing chat between:', user1, 'and', user2); // Debug log

      // Check if direct chat already exists between these two users
      const checkQuery = `
        query CheckDirectChat($user1: Int!, $user2: Int!) {
          chats(
            where: {
              type: { _eq: "direct" }
              _and: [
                { chat_participants: { user_id: { _eq: $user1 } } }
                { chat_participants: { user_id: { _eq: $user2 } } }
              ]
            }
            limit: 1
          ) {
            id
            type
            chat_participants {
              user_id
              user_type
            }
          }
        }
      `;

      const checkResult: any = await client.request(checkQuery, {
        user1: user1,
        user2: user2
      });

      if (checkResult.chats.length > 0) {
        const existingChat = checkResult.chats[0];
        const participantsList = [];

        for (const p of existingChat.chat_participants) {
          const userInfo = await getUserInfo(p.user_id, p.user_type);
          if (userInfo) participantsList.push(userInfo);
        }

        const otherUser = participantsList.find((u: any) => u.id !== user1);

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          body: JSON.stringify({
            success: true,
            chat: {
              id: existingChat.id,
              type: 'direct',
              name: otherUser?.name || 'Unknown',
              participants: participantsList,
              unread_count: 0
            }
          })
        };
      }
      const createMutation = `
        mutation CreateDirectChat($participants: [chat_participants_insert_input!]!) {
          insert_chats_one(
            object: {
              type: "direct"
              chat_participants: {
                data: $participants
              }
            }
          ) {
            id
            type
            chat_participants {
              user_id
              user_type
            }
          }
        }
      `;

      const participantsData = [
        { user_id: user1, user_type: user1Type },
        { user_id: user2, user_type: user2Type }
      ];

      console.log('Creating chat with participants:', participantsData); // Debug log

      const createResult: any = await client.request(createMutation, {
        participants: participantsData
      });

      const chat = createResult.insert_chats_one;

      // Get full participant details
      const participantsList = [];
      for (const p of chat.chat_participants) {
        const userInfo = await getUserInfo(p.user_id, p.user_type);
        if (userInfo) participantsList.push(userInfo);
      }

      const otherUser = participantsList.find((u: any) => u.id !== user1);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: true,
          chat: {
            id: chat.id,
            type: 'direct',
            name: otherUser?.name || 'Unknown',
            participants: participantsList,
            unread_count: 0
          }
        })
      };

    } else if (type === 'group') {
      if (!name || !created_by || !members || members.length < 2) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          body: JSON.stringify({
            success: false,
            message: 'Group chat requires name, created_by, and at least 2 members with format: [{user_id: number, user_type: string}]'
          })
        };
      }

      // Create group chat
      // In createChat.ts, update the group creation mutation:

      const createGroupMutation = `
  mutation CreateGroup($name: String!, $members: [chat_participants_insert_input!]!) {
    insert_chats_one(
      object: {
        type: "group"
        name: $name
        chat_participants: {
          data: $members
        }
      }
    ) {
      id
      type
      name
      chat_participants {
        user_id
        user_type
      }
    }
  }
`;

      const membersData = members.map((m: any) => {
        if (typeof m === 'object') {
          return { user_id: m.user_id, user_type: m.user_type };
        }
        return { user_id: m, user_type: 'parent' };
      });
      const result: any = await client.request(createGroupMutation, {
        name,
        members: membersData
      });


      const chat = result.insert_chats_one;

      const participantsList = [];
      for (const p of chat.chat_participants) {
        const userInfo = await getUserInfo(p.user_id, p.user_type);
        if (userInfo) participantsList.push(userInfo);
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: true,
          chat: {
            id: chat.id,
            type: 'group',
            name: chat.name,
            participants: participantsList,
            unread_count: 0
          }
        })
      };
    }

    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Invalid chat type. Must be "direct" or "group"'
      })
    };
  } catch (error: any) {
    console.error('Error creating chat:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error creating chat',
        error: error.message
      })
    };
  }
};