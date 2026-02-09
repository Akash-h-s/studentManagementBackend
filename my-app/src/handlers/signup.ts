import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";
import { signupSchema, validateRequest } from "../utils/validationSchemas";
import { generateToken } from "../utils/jwtUtils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return { 
      statusCode: 200, 
      headers: corsHeaders, 
      body: "" 
    };
  }

  try {
    console.log("Received signup request:", event.body);
    
    const body = JSON.parse(event.body || "{}");
    const args = body.input || body;

    // Validate request
    const validation = validateRequest(signupSchema, args);
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

    const { schoolName, email, password, phone } = validation.data;
    
    const hash = await bcrypt.hash(password, 8);
    
    const result = await gqlSdk.InsertAdmin({
      school: schoolName,
      email: email,
      pass: hash,
      phone: phone
    });
    
    console.log("Signup successful:", result);
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: "Signup successful",
        user: {
          id: result.insert_admins_one?.id,
          name: schoolName,
          email: email,
          role: "admin"
        },
        token: generateToken({
          id: result.insert_admins_one?.id?.toString() || '',
          email: email,
          role: 'admin',
          name: schoolName
        })
      })
    };

  } catch (err: any) {
    console.error("Signup error:", err);
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