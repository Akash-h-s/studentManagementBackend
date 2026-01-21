import { getSdk } from "../generated/graphql";
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HASURA_ENDPOINT || "http://localhost:8080/v1/graphql";
const secret = process.env.HASURA_SECRET || "myadminsecretkey";

console.log(endpoint);
console.log(secret);

const client = new GraphQLClient(endpoint, {
    headers: {
        "x-hasura-admin-secret": secret,
    }
});

export const gqlSdk = getSdk(client);