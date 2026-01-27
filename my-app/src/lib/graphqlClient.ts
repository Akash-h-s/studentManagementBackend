// src/lib/graphqlClient.ts
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql';
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET || 'myadminsecretkey';

// Create GraphQL client
const client = new GraphQLClient(HASURA_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  },
});

// Get SDK with typed operations
export const sdk = getSdk(client);

// Export client for custom operations if needed
export { client };