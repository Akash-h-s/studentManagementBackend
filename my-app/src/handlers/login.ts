import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const commonHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  try {
    const eventbody = JSON.parse(event.body || "{}");
    const { role, identifier, password, studentName } = eventbody;

    let user_id: string = "";
    let user_name: string = "";
    let user_email: string = "";

    if (role === "admin") {
      const res = await gqlSdk.SelectAdminByEmail({ email: identifier });
      const admin = res.admins?.[0];
      if (!admin) return { statusCode: 401, headers: commonHeaders, body: JSON.stringify({ message: "Admin not found" }) };
      
      const isValid = await bcrypt.compare(password, admin.password_hash);
      if (!isValid) return { statusCode: 401, headers: commonHeaders, body: JSON.stringify({ message: "Invalid Password" }) };
      
      user_id = admin.id.toString();
      user_name = admin.school_name;
    }

    else if (role === "student") {
      const res = await gqlSdk.SelectStudentByDetails({ admission_no: identifier, name: studentName });
      if (!res.students?.[0]) return { statusCode: 401, headers: commonHeaders, body: JSON.stringify({ message: "Student not found" }) };
      
      user_id = res.students[0].id.toString();
      user_name = res.students[0].name;
    }
    else if (role === "teacher") {
      const res = await gqlSdk.SelectTeacherByEmail({ email: identifier });
      if (!res.teachers?.[0]) return { statusCode: 401, headers: commonHeaders, body: JSON.stringify({ message: "Teacher email not found" }) };
      
      user_id = res.teachers[0].id.toString();
      user_name = res.teachers[0].name;
      user_email = res.teachers[0].email;
    }

    else if (role === "parent") {
      const res = await gqlSdk.SelectParentByEmail({ email: identifier });
      if (!res.students?.[0]) return { statusCode: 401, headers: commonHeaders, body: JSON.stringify({ message: "No student linked to this parent email" }) };
      
      user_id = res.students[0].id.toString();
      user_name = `Parent of ${res.students[0].name}`;
      user_email = res.students[0].parent_email;
    }

    return {
      statusCode: 200,
      headers: commonHeaders,
      body: JSON.stringify({
        message: "Login successful",
        user: { id: user_id, name: user_name, email: user_email, role }
      })
    };

  } catch (err: any) {
    console.error("LOGIN_ERROR:", err);
    return {
      statusCode: 500,
      headers: commonHeaders,
      body: JSON.stringify({ message: err.message })
    };
  }
};