// src/handlers/forgotPassword.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { gqlSdk } from "../config/graphClient";
import { forgotPasswordSchema, validateRequest } from "../utils/validationSchemas";
import { successResponse, errorResponse, optionsResponse } from "../utils/apiResponse";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "OPTIONS") {
        return optionsResponse();
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const args = body.input || body;

        // Validate request
        const validation = validateRequest(forgotPasswordSchema, args);
        if (!validation.valid) {
            return errorResponse(validation.error || 'Invalid request', 400);
        }

        const { email, role } = validation.data;
        let userExists = false;

        switch (role) {
            case 'admin': {
                const result = await gqlSdk.SelectAdminByEmail({ email });
                userExists = (result.admins?.length || 0) > 0;
                break;
            }
            case 'teacher': {
                const result = await gqlSdk.SelectTeacherByEmail({ email });
                userExists = (result.teachers?.length || 0) > 0;
                break;
            }
            case 'parent': {
                const result = await gqlSdk.SelectParentByEmail({ email });
                userExists = (result.parents?.length || 0) > 0;
                break;
            }
        }

        if (userExists) {
            return successResponse({ message: "Email verified successfully" });
        } else {
            return errorResponse("Email not found in our records", 404);
        }

    } catch (err: any) {
        console.error("Forgot password error:", err);
        return errorResponse(err.message || "Internal server error", 500, err);
    }
};

