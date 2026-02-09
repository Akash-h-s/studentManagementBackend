import { handler } from "../handlers/signup";
import { gqlSdk } from "../config/graphClient";
import bcrypt from "bcryptjs";

jest.mock("../config/graphClient");
jest.mock("bcryptjs");

describe("Signup Handler", () => {
  const validArgs = {
    schoolName: "Test Academy",
    email: "admin@test.com",
    password: "securePassword123",
    phone: "1234567890"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully create an admin with a hashed password", async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password_val");
    (gqlSdk.InsertAdmin as jest.Mock).mockResolvedValue({
      insert_admins_one: { id: "admin-123" }
    });

    const event = {
      body: JSON.stringify(validArgs),
      httpMethod: "POST"
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.user.id).toBe("admin-123");
    
    // Verify password was hashed before DB insertion
    expect(gqlSdk.InsertAdmin).toHaveBeenCalledWith(expect.objectContaining({
      pass: "hashed_password_val"
    }));
  });

  it("should return 400 if a required field is missing", async () => {
    const event = {
      body: JSON.stringify({ email: "only-email@test.com" }),
      httpMethod: "POST"
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toBe("Missing required fields");
    expect(gqlSdk.InsertAdmin).not.toHaveBeenCalled();
  });

  it("should handle nested Hasura input objects", async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue("hash");
    (gqlSdk.InsertAdmin as jest.Mock).mockResolvedValue({ insert_admins_one: { id: "1" } });

    const event = {
      body: JSON.stringify({ input: validArgs }), // Nested input
      httpMethod: "POST"
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(200);
  });

  it("should return 500 if the database insertion fails", async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue("hash");
    (gqlSdk.InsertAdmin as jest.Mock).mockRejectedValue(new Error("Unique constraint violation"));

    const event = {
      body: JSON.stringify(validArgs),
      httpMethod: "POST"
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toContain("Unique constraint violation");
  });
});