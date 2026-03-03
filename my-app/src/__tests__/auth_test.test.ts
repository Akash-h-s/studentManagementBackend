import { withAuth } from "../utils/authMiddleware";
import { verifyRequestToken } from "../utils/jwtUtils";

jest.mock("../utils/jwtUtils", () => ({
    verifyRequestToken: jest.fn().mockReturnValue({ id: "123", role: "admin" }),
}));

describe("Auth Middleware Test", () => {
    beforeEach(() => {
        (verifyRequestToken as jest.Mock).mockReturnValue({ id: "123", role: "admin" });
    });

    it("should pass with mocked token", async () => {
        const handler = jest.fn().mockResolvedValue({ statusCode: 200, body: "ok" });
        const wrapped = withAuth(handler);

        const event = {
            headers: { Authorization: "Bearer mock" },
        } as any;

        const result = await wrapped(event);
        expect(result.statusCode).toBe(200);
        expect(handler).toHaveBeenCalledWith(event, { id: "123", role: "admin" });
    });

    it("should fail without token", async () => {
        (verifyRequestToken as jest.Mock).mockReturnValue(null);
        const handler = jest.fn();
        const wrapped = withAuth(handler);

        const event = {
            headers: {},
        } as any;

        const result = await wrapped(event);
        expect(result.statusCode).toBe(401);
    });
});
