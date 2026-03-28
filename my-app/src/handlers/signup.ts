// src/handlers/signup.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";
import { signupSchema, validateRequest } from "../utils/validationSchemas";
import { generateToken } from "../utils/jwtUtils";
import { successResponse, errorResponse, optionsResponse } from "../utils/apiResponse";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return optionsResponse();
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const args = body.input || body;

    // Validate request
    const validation = validateRequest(signupSchema, args);
    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request', 400);
    }

    const { schoolName, email, password, phone } = validation.data;
    const hash = await bcrypt.hash(password, 8);

    const result = await gqlSdk.InsertAdmin({
      school: schoolName,
      email: email,
      pass: hash,
      phone: phone
    });

    const admin = result.insert_admins_one;
    if (!admin) throw new Error("Failed to create admin");

    return successResponse({
      message: "Admin created successfully",
      user: {
        id: admin.id,
        name: schoolName,
        email: email,
        role: "admin"
      },
      token: generateToken({
        id: admin.id.toString(),
        email: email,
        role: 'admin',
        name: schoolName
      })
    });

  } catch (err: any) {
    console.error("Signup error:", err);
    return errorResponse(err.message || "Internal server error", 500, err);
  }
};
