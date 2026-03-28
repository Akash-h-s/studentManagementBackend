// src/handlers/login.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { loginSchema, validateRequest } from "../utils/validationSchemas";
import { generateToken } from "../utils/jwtUtils";
import { AuthService } from "../services/authService";
import { successResponse, errorResponse, optionsResponse } from "../utils/apiResponse";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") {
    return optionsResponse();
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const args = body.input || body;

    const validation = validateRequest(loginSchema, args);
    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid request', 400);
    }

    const { role, identifier, password, studentName } = validation.data;
    const userData = await AuthService.login(role, identifier, password, studentName);

    const token = generateToken({
      id: userData.id,
      email: userData.email,
      role: role as 'admin' | 'teacher' | 'parent' | 'student',
      name: userData.name,
      schoolName: userData.schoolName
    });

    return successResponse({
      token,
      user: userData,
      message: "Login successful"
    });

  } catch (err: any) {
    console.error("Login error:", err);
    const statusCode = err.message.includes('not found') || err.message.includes('Invalid password') ? 401 : 500;
    return errorResponse(err.message || "Internal server error", statusCode);
  }
};
