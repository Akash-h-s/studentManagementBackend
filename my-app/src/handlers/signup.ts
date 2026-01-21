import { APIGatewayProxyEvent } from "aws-lambda";
import bcrypt from "bcryptjs";

import { gqlSdk } from "../config/graphClient";

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
      email,
      password,
      phone
    } = args;
    const hash = await bcrypt.hash(password, 8);
    const result = await gqlSdk.InsertAdmin({
      school: schoolName,
      email: email,
      pass: hash,
      phone: phone
    });
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify(result.insert_admins_one)
    };

  } catch (err: any) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: err.message })
    };
  }
};
