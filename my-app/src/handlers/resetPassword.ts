// src/handlers/resetPassword.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";
import { resetPasswordSchema, validateRequest } from "../utils/validationSchemas";
import { successResponse, errorResponse, optionsResponse } from "../utils/apiResponse";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "OPTIONS") {
        return optionsResponse();
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const args = body.input || body;

        // Validate request
        const validation = validateRequest(resetPasswordSchema, args);
        if (!validation.valid) {
            return errorResponse(validation.error || 'Invalid request', 400);
        }

        const { email, role, newPassword } = validation.data;
        const hash = await bcrypt.hash(newPassword, 8);
        let affectedRows = 0;

        switch (role) {
            case 'admin': {
                const result = await gqlSdk.UpdateAdminPassword({ email, password_hash: hash });
                affectedRows = result.update_admins?.affected_rows || 0;
                break;
            }
            case 'teacher': {
                const result = await gqlSdk.UpdateTeacherPassword({ email, password_hash: hash });
                affectedRows = result.update_teachers?.affected_rows || 0;
                break;
            }
            case 'parent': {
                const result = await gqlSdk.UpdateParentPassword({ email, password_hash: hash });
                affectedRows = result.update_parents?.affected_rows || 0;
                break;
            }
        }

        if (affectedRows > 0) {
            return successResponse({ message: "Password updated successfully" });
        } else {
            return errorResponse("Could not update password. User not found.", 404);
        }

    } catch (err: any) {
        console.error("Reset password error:", err);
        return errorResponse(err.message || "Internal server error", 500, err);
    }
};

