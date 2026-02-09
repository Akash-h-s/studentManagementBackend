import { handler } from "../handlers/workflowStatus";
import { Connection, Client } from "@temporalio/client";

jest.mock("@temporalio/client", () => ({
  Connection: { connect: jest.fn() },
  Client: jest.fn(),
}));

describe("Workflow Status Handler", () => {
  const mockGetHandle = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    (Connection.connect as jest.Mock).mockResolvedValue({});
    (Client as any).mockImplementation(() => ({
      workflow: { getHandle: mockGetHandle },
    }));
  });

  it("should return 200 and progress 50 when workflow is RUNNING", async () => {
    const mockDescribe = jest.fn().mockResolvedValue({
      status: { name: "RUNNING" },
    });
    mockGetHandle.mockReturnValue({ describe: mockDescribe });

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ workflowId: "test-id" }),
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.status).toBe("running");
    expect(body.progress).toBe(50);
    expect(body.currentStep).toContain("Processing");
  });

  it("should return 200 and full result when workflow is COMPLETED", async () => {
    const mockDescribe = jest.fn().mockResolvedValue({
      status: { name: "COMPLETED" },
    });
    const mockResult = jest.fn().mockResolvedValue({
      recordsProcessed: 100,
      emailsSent: 95,
      emailsFailed: 5,
    });
    
    mockGetHandle.mockReturnValue({ 
        describe: mockDescribe,
        result: mockResult 
    });

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ workflowId: "success-id" }),
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.progress).toBe(100);
    expect(body.recordsProcessed).toBe(100);
    expect(mockResult).toHaveBeenCalled(); // result() should only be called if completed
  });

  it("should return 404 when Temporal returns 'not found' error", async () => {
    const mockDescribe = jest.fn().mockRejectedValue(new Error("workflow not found"));
    mockGetHandle.mockReturnValue({ describe: mockDescribe });

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ workflowId: "missing-id" }),
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).message).toBe("Workflow not found");
  });

  it("should return 500 if workflowId is missing from request", async () => {
    const event = {
      httpMethod: "POST",
      body: JSON.stringify({}),
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe("workflowId is required");
  });
});