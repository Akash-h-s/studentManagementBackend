// src/handlers/searchParents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLClient } from 'graphql-request';
import { searchParentsSchema, validateRequest } from '../utils/validationSchemas';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const { search_query, current_user_id, current_user_type } = JSON.parse(event.body || '{}');

    // Validate request
    const validation = validateRequest(searchParentsSchema, { search_query });
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

    const validatedSearchQuery = validation.data.search_query;

    if (!validatedSearchQuery) {
      // If no search query, return all parents
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

      let parents = result.parents.map((p: any) => ({
        id: p.id,
        name: p.name,
        email: p.email,
        role: 'parent',
        student_name: p.students?.[0]?.name || null,
        chat_id: null
      }));

      // If the client provided the current user, try to find existing direct chats
      if (current_user_id) {
        const chatCheckQuery = `
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
            }
          }
        `;

        for (const p of parents) {
          try {
            const res: any = await client.request(chatCheckQuery, { user1: current_user_id, user2: p.id });
            if (res?.chats?.length > 0) p.chat_id = res.chats[0].id;
          } catch (err) {
            // ignore per-parent chat lookup errors
            console.warn('chat lookup failed for parent', p.id, err?.message);
          }
        }
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({
          success: true,
          parents
        })
      };
    }

    // Search parents by name or email
    const query = `
      query SearchParents($search: String!) {
        parents(
          where: {
            _or: [
              { name: { _ilike: $search } }
              { email: { _ilike: $search } }
            ]
          }
          order_by: { name: asc }
        ) {
          id
          name
          email
          students {
            name
          }
        }
      }
    `;

    const result: any = await client.request(query, {
      search: `%${validatedSearchQuery}%`
    });

    let parents = result.parents.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: 'parent',
      student_name: p.students?.[0]?.name || null,
      chat_id: null
    }));

    // If current user provided, attach existing direct chat id when present
    if (current_user_id) {
      const chatCheckQuery = `
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
          }
        }
      `;

      for (const p of parents) {
        try {
          const res: any = await client.request(chatCheckQuery, { user1: current_user_id, user2: p.id });
          if (res?.chats?.length > 0) p.chat_id = res.chats[0].id;
        } catch (err) {
          console.warn('chat lookup failed for parent', p.id, err?.message);
        }
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: true,
        parents
      })
    };
  } catch (error: any) {
    console.error('Error searching parents:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        success: false,
        message: 'Error searching parents',
        error: error.message
      })
    };
  }
};