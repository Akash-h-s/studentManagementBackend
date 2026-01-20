import { APIGatewayProxyEvent } from "aws-lambda";
import bcrypt from "bcryptjs";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS"
};
export const handler = async (event: APIGatewayProxyEvent) => {

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const args = body.input || body;

    const {
      schoolName,
      fullName,
      email,
      password,
      confirmPassword
    } = args;

    if (!schoolName)
      throw new Error("School name required");

    if (password !== confirmPassword)
      throw new Error("Passwords do not match");

    const hash = await bcrypt.hash(password, 8);
    await fetch("http://host.docker.internal:8085/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!
      },
      body: JSON.stringify({
        query: `
          mutation ($obj: admins_insert_input!) {
            insert_admins_one(object: $obj) {
              id
            }
          }
        `,
        variables: {
          obj: {
            school_name: schoolName,
            full_name: fullName,
            email,
            password_hash: hash,
            role: "admin"
          }
        }
      })
    });

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        name: fullName,
        email,
        role: "admin"
      })
    };

  } catch (err: any) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ message: err.message })
    };
  }
};
