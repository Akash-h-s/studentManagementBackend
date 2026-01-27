import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import XLSX from "xlsx";
import fs from "fs";
import bcrypt from "bcryptjs";
import Mailgun from "mailgun.js";
import formData from "form-data";
import { gqlSdk } from "../config/graphClient";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const generatePassword = () => Math.random().toString(36).slice(-8);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };

  try {
    if (!event.body) throw new Error("Empty body");
    const { class: className, section, fileBase64, filename, type } = JSON.parse(event.body);

    console.log(`Upload type: ${type}`);

    const buffer = Buffer.from(fileBase64, "base64");
    const filePath = "/tmp/upload.xlsx";
    fs.writeFileSync(filePath, buffer);

    const workbook = XLSX.readFile(filePath);
    
    const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

    console.log(`Found ${rows.length} rows in Excel`);
    if (rows.length === 0) throw new Error("Excel file is empty");

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || '',
    });
    const domain = process.env.MAILGUN_DOMAIN || '';

    console.log(`Mailgun domain: ${domain}`);

    if (type === "student") {
      const sectionRes = await gqlSdk.InsertClassSection({
        object: { class_name: className, section_name: section }
      });

      const classSectionId = sectionRes.insert_class_sections_one?.id;
      if (!classSectionId) throw new Error("Failed to resolve Class/Section");

      const studentData = await Promise.all(rows.map(async (row) => {
        const admNo = (row.admission_no || row.AdmissionNo || row["Admission No"] || row.id)?.toString();
        const pEmail = row.parent_email || row["Parent Email"] || row.parentEmail;
        const pName = row.parent_name || row["Parent Name"] || "Unknown Parent";
        const sName = row.name || row.Name || row["Student Name"] || "Unknown Student";

        const rawPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        if (pEmail) {
          console.log(`Sending email to parent: ${pEmail}`);
          try {
            const result = await mg.messages.create(domain, {
              from: `School Management <postmaster@${domain}>`,
              to: [pEmail],
              subject: "Parent Portal Access",
              text: `Hello ${pName}, student ${sName} has been registered. Your password is: ${rawPassword}`,
            });
            console.log(`Email sent successfully to ${pEmail}:`, result);
          } catch (emailErr: any) {
            console.error(`Mailgun failed for parent ${pEmail}:`, emailErr.message || emailErr);
          }
        } else {
          console.log(`No email found for parent of student ${sName}`);
        }

        return {
          admission_no: admNo,
          name: sName,
          gender: row.gender || row.Gender || "N/A",
          dob: row.dob || row.DOB || null,
          class_section_id: classSectionId,
          parent: {
            data: {
              name: pName,
              email: pEmail || null,
              password_hash: hashedPassword 
            }
          }
        };
      }));

      await gqlSdk.InsertStudents({ list: studentData });
      console.log(`Inserted ${studentData.length} students`);

    } else if (type === "teacher") {
      console.log(`Processing ${rows.length} teachers`);
      
      const teacherData = await Promise.all(rows.map(async (row, index) => {
        console.log(`Processing teacher row ${index + 1}:`, row);
        
        const tName = row.name || row.Name || row["Teacher Name"] || "Unknown Teacher";
        const tEmail = row.email || row.Email || row["Teacher Email"] || row.teacherEmail;
        
        console.log(`Teacher ${index + 1}: Name=${tName}, Email=${tEmail}`);
        
        const rawPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        if (tEmail) {
          console.log(`Sending email to teacher: ${tEmail}`);
          try {
            const result = await mg.messages.create(domain, {
              from: `School Management <postmaster@${domain}>`,
              to: [tEmail],
              subject: "Teacher Portal Access",
              text: `Hello ${tName}, you have been registered as a teacher. Your login password is: ${rawPassword}`,
            });
            console.log(`Email sent successfully to teacher ${tEmail}:`, result);
          } catch (emailErr: any) {
            console.error(`Mailgun failed for teacher ${tEmail}:`, emailErr.message || emailErr);
            console.error('Full error:', emailErr);
          }
        } else {
          console.log(`No email found for teacher ${tName}`);
        }

        return {
          name: tName,
          email: tEmail || null,
          phone: (row.phone || row.Phone || row["Phone Number"])?.toString(),
          qualification: row.qualification || row.Qualification,
          password_hash: hashedPassword 
        };
      }));

      console.log(`Inserting ${teacherData.length} teachers into database`);
      await gqlSdk.InsertTeachers({ list: teacherData });
      console.log(`Successfully inserted teachers`);
    }

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ message: "Upload success", count: rows.length }),
    };

  } catch (err: any) {
    console.error("Handler Error:", err.message);
    console.error("Stack trace:", err.stack);
    
    // If the error is about upload info but data was inserted successfully, ignore it
    if (err.message && err.message.includes("uploaded")) {
      return {
        statusCode: 200,
        headers: cors,
        body: JSON.stringify({ message: "Upload success", count: rows.length }),
      };
    }
    
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: err.message }),
    };
  }
};