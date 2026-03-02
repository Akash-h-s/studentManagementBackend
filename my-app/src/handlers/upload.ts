import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Connection, Client } from '@temporalio/client';
import { withAuth } from "../utils/authMiddleware";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

let temporalClient: Client | null = null;

async function getTemporalClient(): Promise<Client> {
  if (!temporalClient) {
    const connection = await Connection.connect({
      address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
    });
    temporalClient = new Client({ connection });
  }
  return temporalClient;
}

export const handler = withAuth(async (event: APIGatewayProxyEvent, user): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error("Empty body");
    const { class: className, section, fileBase64, filename, type } = JSON.parse(event.body);

    // Verify user is admin
    if (user.role !== 'admin') {
      return {
        statusCode: 403,
        headers: cors,
        body: JSON.stringify({ message: "Forbidden: Admin access required" }),
      };
    }

    const adminId = user.id;

    console.log(`📤 Starting upload workflow for type: ${type} by Admin: ${adminId}`);

    // Get Temporal client
    const client = await getTemporalClient();

    // Start workflow
    const workflowId = `upload-${type}-${Date.now()}`;

    const handle = await client.workflow.start("uploadWorkflow", {
      taskQueue: 'upload-queue',
      workflowId,
      args: [{
        type,
        fileBase64,
        filename,
        className,
        section,
        adminId: parseInt(adminId), // Ensure it's a number
      }],
    });

    console.log(`✅ Workflow started with ID: ${handle.workflowId}`);

    // Return immediately (async processing)
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        success: true,
        message: "Upload workflow started",
        workflowId: handle.workflowId,
      }),
    };

  } catch (err: any) {
    console.error("❌ Handler Error:", err.message);
    console.error("Stack trace:", err.stack);

    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({
        success: false,
        message: err.message
      }),
    };
  }
});