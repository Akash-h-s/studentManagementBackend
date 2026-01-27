import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";

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
    const { role, identifier, password, studentName } = body.input || body;

    console.log(`Login attempt - Role: ${role}, Identifier: ${identifier}, Has Password: ${!!password}`);

    let user: any = null;
    let isValidPassword = true;

    switch (role) {
      case 'admin': {
        const adminResult = await gqlSdk.GetAdminByEmail({ email: identifier });
        console.log('Admin result:', adminResult);
        
        if (adminResult.admins && adminResult.admins.length > 0) {
          user = adminResult.admins[0];
          if (password && user.password_hash) {
            isValidPassword = await bcrypt.compare(password, user.password_hash);
          } else if (!password) {
            return {
              statusCode: 400,
              headers: corsHeaders,
              body: JSON.stringify({
                success: false,
                message: "Password is required for admin login"
              })
            };
          }
        }
        break;
      }

      case 'teacher': {
        const teacherResult = await gqlSdk.GetTeacherByEmail({ email: identifier });
        console.log('Teacher result:', teacherResult);
        
        if (teacherResult.teachers && teacherResult.teachers.length > 0) {
          user = teacherResult.teachers[0];
          if (password && user.password_hash) {
            isValidPassword = await bcrypt.compare(password, user.password_hash);
          } else if (!password) {
            return {
              statusCode: 400,
              headers: corsHeaders,
              body: JSON.stringify({
                success: false,
                message: "Password is required for teacher login"
              })
            };
          }
        }
        break;
      }

      case 'parent': {
        const parentResult = await gqlSdk.GetParentByEmail({ email: identifier });
        console.log('Parent result:', parentResult);
        
        if (parentResult.parents && parentResult.parents.length > 0) {
          user = parentResult.parents[0];
          if (password && user.password_hash) {
            isValidPassword = await bcrypt.compare(password, user.password_hash);
          } else if (!password) {
            return {
              statusCode: 400,
              headers: corsHeaders,
              body: JSON.stringify({
                success: false,
                message: "Password is required for parent login"
              })
            };
          }
        }
        break;
      }

      case 'student': {
        const studentResult = await gqlSdk.GetStudentByAdmissionNumber({ 
          admissionNumber: identifier,
          name: studentName 
        });
        console.log('Student result:', studentResult);
        
        if (studentResult.students && studentResult.students.length > 0) {
          user = studentResult.students[0];
        }
        break;
      }

      default:
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            message: "Invalid role"
          })
        };
    }

    console.log('Found user:', user);
    console.log('Password valid:', isValidPassword);

    if (!user) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: `${role} not found with provided credentials`
        })
      };
    }

    if (!isValidPassword) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: "Invalid password"
        })
      };
    }

    // Build response with actual user data
    const userData = {
      id: user.id?.toString() || '',
      name: user.name || user.school_name || '',
      email: user.email || identifier,
      role: role
    };

    console.log('Returning user data:', userData);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: "Login successful",
        user: userData,
        token: `jwt-${userData.id}-${Date.now()}`
      })
    };

  } catch (err: any) {
    console.error("Login error:", err);
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