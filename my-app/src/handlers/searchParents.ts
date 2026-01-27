// src/handlers/searchParents.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GraphQLClient } from 'graphql-request';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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
    const { search_query } = JSON.parse(event.body || '{}');

    if (!search_query) {
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
      search: `%${search_query}%` 
    });

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