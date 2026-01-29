import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Connection, Client } from '@temporalio/client';

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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  try {
    if (!event.body) throw new Error("Empty body");
    const { workflowId } = JSON.parse(event.body);

    if (!workflowId) {
      throw new Error("workflowId is required");
    }

    console.log(`🔍 Fetching status for workflow: ${workflowId}`);

    const client = await getTemporalClient();
    const handle = client.workflow.getHandle(workflowId);
    const description = await handle.describe();

    let result = null;
    let currentStep = '';
    let progress = 0;

    if (description.status.name === 'COMPLETED') {
      result = await handle.result();
      currentStep = 'Upload completed successfully!';
      progress = 100;
    } else if (description.status.name === 'RUNNING') {
      currentStep = 'Processing your upload...';
      progress = 50;
    } else if (description.status.name === 'FAILED') {
      currentStep = 'Workflow failed';
      progress = 0;
    }

    const response = {
      workflowId,
      status: description.status.name.toLowerCase(),
      recordsProcessed: result?.recordsProcessed || 0,
      emailsSent: result?.emailsSent || 0,
      emailsFailed: result?.emailsFailed || 0,
      currentStep,
      progress,
    };

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify(response),
    };

  } catch (err: any) {
    console.error("❌ Workflow Status Error:", err.message);

    if (err.message?.includes('not found')) {
      return {
        statusCode: 404,
        headers: cors,
        body: JSON.stringify({ 
          message: "Workflow not found",
        }),
      };
    }

    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: err.message }),
    };
  }
};