
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import XLSX from "xlsx";
import fs from "fs";
import { gqlSdk } from "../config/graphClient";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };

  try {
    if (!event.body) throw new Error("Empty body");
    const { class: className, section, fileBase64, filename, adminId, type } = JSON.parse(event.body);

    const buffer = Buffer.from(fileBase64, "base64");
    const filePath = "/tmp/upload.xlsx";
    fs.writeFileSync(filePath, buffer);
    const workbook = XLSX.readFile(filePath);
    const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

    if (rows.length === 0) throw new Error("Excel file is empty");

    
    if (type === "student") {
      const sectionRes = await gqlSdk.InsertClassSection({
        object: {
          class_name: className,
          section_name: section
        }
      });

      const classSectionId = sectionRes.insert_class_sections_one?.id;
      if (!classSectionId) {
        throw new Error(`Failed to resolve or create Class/Section: ${className}-${section}`);
      }
      const studentData = rows.map((row) => {
      const admNo = (row.admission_no || row.AdmissionNo || row["Admission No"] || row.id || row.ID)?.toString();
        
        if (!admNo) {
          throw new Error(`Critical Error: Found a student row without an Admission Number.`);
        }

        return {
          admission_no: admNo,
          name: row.name || row.Name || row["Student Name"] || "Unknown Student",
          gender: row.gender || row.Gender || "N/A",
          dob: row.dob || row.DOB || null,
          class_section_id: classSectionId,
          parent_name:row.parent_name,
          parent_email:row.parent_email
          
        };
      });

      await gqlSdk.InsertStudents({ list: studentData });
    } else if (type === "teacher") {
      const teacherData = rows.map((row) => ({
        name: row.name || row.Name,
        email: row.email || row.Email,
        phone: (row.phone || row.Phone)?.toString(),
        qualification: row.qualification || row.Qualification
      }));

      await gqlSdk.InsertTeachers({ list: teacherData });
    }

    
    await gqlSdk.InsertUploadInfo({
      filename: filename,
      type: type,
      uploaded: adminId 
    });

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ message: "Upload success", count: rows.length }),
    };

  } catch (err: any) {
    console.error("Handler Error:", err.message);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: err.message }),
    };
  }
};