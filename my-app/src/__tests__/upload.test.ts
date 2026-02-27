import { Connection, Client } from "@temporalio/client";

jest.mock("../utils/authMiddleware", () => ({
  withAuth: (handler: any) => async (event: any) => handler(event, { id: "1", role: "admin", email: "admin@test.com" }),
}));

jest.mock("@temporalio/client", () => ({
  Connection: {
    connect: jest.fn(),
  },
  Client: jest.fn(),
}));

import { handler } from "../handlers/upload";

describe("Temporal Upload Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle Temporal connection errors", async () => {
    // Force the connection to fail
    (Connection.connect as jest.Mock).mockRejectedValue(new Error("Temporal Unavailable"));

    const event = {
      httpMethod: "POST",
      headers: { Authorization: "Bearer valid-token" },
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
      headers: { Authorization: "Bearer valid-token" },
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