
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { gqlSdk } from "../config/graphClient";
import { forgotPasswordSchema, validateRequest } from "../utils/validationSchemas";

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
        const validation = validateRequest(forgotPasswordSchema, args);
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

        const { email, role } = validation.data;

        let userExists = false;

        switch (role) {
            case 'admin': {
                const result = await gqlSdk.SelectAdminByEmail({ email });
                if (result.admins && result.admins.length > 0) {
                    userExists = true;
                }
                break;
            }
            case 'teacher': {
                const result = await gqlSdk.SelectTeacherByEmail({ email });
                if (result.teachers && result.teachers.length > 0) {
                    userExists = true;
                }
                break;
            }
            case 'parent': {
                const result = await gqlSdk.SelectParentByEmail({ email });
                if (result.parents && result.parents.length > 0) {
                    userExists = true;
                }
                break;
            }
        }

        if (userExists) {
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: "Email verified successfully"
                })
            };
        } else {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    message: "Email not found in our records"
                })
            };
        }

    } catch (err: any) {
        console.error("Forgot password error:", err);
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
