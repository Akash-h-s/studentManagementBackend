
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";
import { resetPasswordSchema, validateRequest } from "../utils/validationSchemas";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "" };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const args = body.input || body;

        // Validate request
        const validation = validateRequest(resetPasswordSchema, args);
        if (!validation.valid) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: validation.error
                })
            };
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
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: "Password updated successfully"
                })
            };
        } else {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: "Could not update password. User not found."
                })
            };
        }

    } catch (err: any) {
        console.error("Reset password error:", err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                message: err.message || "Internal server error"
            })
        };
    }
};
