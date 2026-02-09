// src/handlers/getAllParents.ts
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
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'default_dev_secret',
    },
  }
);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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