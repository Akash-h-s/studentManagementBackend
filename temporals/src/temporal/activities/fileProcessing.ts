import XLSX from "xlsx";
import fs from "fs";
import os from "os";
import path from "path";

export interface FileProcessingInput {
  fileBase64: string;
  filename: string;
}

// ✅ parseExcelFile with OS temp directory (Windows/Linux/Mac safe)
export async function parseExcelFile(input: FileProcessingInput): Promise<any[]> {
  console.log('📄 Parsing Excel file:', input.filename);

  const buffer = Buffer.from(input.fileBase64, "base64");

  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, `${Date.now()}_${input.filename}`);

  fs.writeFileSync(filePath, buffer);

  const workbook = XLSX.readFile(filePath);
  const rows: any[] = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  fs.unlinkSync(filePath);

  if (rows.length === 0) {
    throw new Error("Excel file is empty");
  }

  console.log(`✅ Parsed ${rows.length} rows from Excel`);
  return rows;
}

// ✅ KEEP this (you lost it before)
export async function validateStudentData(rows: any[]): Promise<any[]> {
  console.log('✅ Validating student data...');

  return rows.map(row => {
    const admNo = (row.admission_no || row.AdmissionNo || row["Admission No"] || row.id)?.toString();
    const pEmail = row.parent_email || row["Parent Email"] || row.parentEmail;
    const pName = row.parent_name || row["Parent Name"] || "Unknown Parent";
    const sName = row.name || row.Name || row["Student Name"] || "Unknown Student";

    return {
      admissionNo: admNo,
      studentName: sName,
      parentEmail: pEmail,
      parentName: pName,
      gender: row.gender || row.Gender || "N/A",
      dob: row.dob || row.DOB || null,
    };
  });
}

// ✅ KEEP this (you lost it before)
export async function validateTeacherData(rows: any[]): Promise<any[]> {
  console.log('✅ Validating teacher data...');

  return rows.map(row => {
    const tName = row.name || row.Name || row["Teacher Name"] || "Unknown Teacher";
    const tEmail = row.email || row.Email || row["Teacher Email"] || row.teacherEmail;

    return {
      name: tName,
      email: tEmail,
      phone: (row.phone || row.Phone || row["Phone Number"])?.toString(),
      qualification: row.qualification || row.Qualification,
    };
  });
}
