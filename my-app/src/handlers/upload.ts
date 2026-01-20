import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import XLSX from "xlsx";
import { Client } from "pg";
import fs from "fs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: cors,
      body: "",
    };
  }

  try {
    if (!event.body) throw new Error("Empty body");

    const body = JSON.parse(event.body);
    const { class: className, section, fileBase64, filename } = body;

    if (!className || !section || !fileBase64 || !filename) {
      throw new Error("Missing fields: class, section, fileBase64, or filename");
    }

    const table = `class_${className}_${section}`.toLowerCase();
    const buffer = Buffer.from(fileBase64, "base64");
    
    // Save to /tmp (the only writable directory in Lambda)
    const filePath = "/tmp/uploaded_file";
    fs.writeFileSync(filePath, buffer);

    let rows: any[] = [];

    if (filename.endsWith(".xlsx") || filename.endsWith(".xls")) {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet);
    } else if (filename.endsWith(".pdf")) {
      rows = [{ name: filename, note: "pdf uploaded" }];
    } else {
      throw new Error("Unsupported file format. Please use Excel or PDF.");
    }

    if (rows.length === 0) throw new Error("No data found in the file");

    const columns = Object.keys(rows[0]);

    // SQL Generation
    const createSQL = `
      CREATE TABLE IF NOT EXISTS ${table} (
        id SERIAL PRIMARY KEY,
        ${columns.map((c) => `"${c}" TEXT`).join(",")}
      );
    `;

    const values = rows.map((row) =>
        `(${columns.map((c) => 
          `'${(row[c] || "").toString().replace(/'/g, "''")}'`
        ).join(",")})`
      ).join(",");

    const insertSQL = `
      INSERT INTO ${table} (${columns.map((c) => `"${c}"`).join(",")})
      VALUES ${values};
    `;

    console.log({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT || "5434"),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    })

    // Database Connection using Environment Variables
    const client = new Client({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT || "5434"),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    console.log("client object")

    await client.connect();

    console.log("client connected")
    await client.query(createSQL);
    await client.query(insertSQL);
    await client.end();

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        message: "Success",
        table,
        rows: rows.length,
      }),
    };

  } catch (err: any) {
    console.error("LAMBDA_ERROR:", err);

    return {
      statusCode: 500,
      headers: cors, // CRITICAL: This allows the browser to read the error
      body: JSON.stringify({
        message: err.message || "Internal Server Error",
      }),
    };
  }
};