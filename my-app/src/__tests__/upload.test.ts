import { handler } from "../handlers/upload";
import { Connection, Client } from "@temporalio/client";

jest.mock("@temporalio/client", () => ({
  Connection: {
    connect: jest.fn(),
  },
  Client: jest.fn(),
}));

describe("Temporal Upload Handler", () => {
  beforeEach(() => {
    // 1. This is the magic line. It clears the 'temporalClient' 
    // variable inside your handler file by re-importing it.
    jest.resetModules(); 
    jest.clearAllMocks();
  });

  it("should handle Temporal connection errors", async () => {
    // Force the connection to fail
    (Connection.connect as jest.Mock).mockRejectedValue(new Error("Temporal Unavailable"));

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ type: "test", class: "10", section: "A" }),
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(500);
    // Now it will correctly catch the "Temporal Unavailable" error
    expect(body.message).toBe("Temporal Unavailable");
  });

  it("should successfully trigger a Temporal workflow", async () => {
    const mockHandle = { workflowId: "upload-test-123" };
    const mockStart = jest.fn().mockResolvedValue(mockHandle);

    (Connection.connect as jest.Mock).mockResolvedValue({});
    (Client as any).mockImplementation(() => ({
      workflow: { start: mockStart },
    }));

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ 
        type: "student-list", 
        class: "10", 
        section: "A",
        fileBase64: "SGVsbG8=",
        filename: "test.csv" 
      }),
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).workflowId).toBe(mockHandle.workflowId);
  });
});