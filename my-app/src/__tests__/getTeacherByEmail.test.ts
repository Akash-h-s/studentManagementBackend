// src/handlers/getTeacherByEmail.test.ts
import { handler } from '../handlers/getTeacherByEmail';
import { gqlSdk } from '../config/graphClient';

// Mock the SDK
jest.mock('../config/graphClient', () => ({
  gqlSdk: {
    GetTeacherIdByEmail: jest.fn(),
  },
}));

describe('getTeacherByEmail Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return teacher details and trim the email input', async () => {
    const mockTeacher = { id: 1, email: 'test@school.com', name: 'John Doe' };
    (gqlSdk.GetTeacherIdByEmail as jest.Mock).mockResolvedValue({ 
      teachers: [mockTeacher] 
    });

    const event = {
      body: JSON.stringify({ email: '  test@school.com  ' }), // Includes whitespace
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.teacher.id).toBe(mockTeacher.id);
    // Verify trim was called
    expect(gqlSdk.GetTeacherIdByEmail).toHaveBeenCalledWith({ email: 'test@school.com' });
  });

  it('should return 404 if no teacher is found', async () => {
    (gqlSdk.GetTeacherIdByEmail as jest.Mock).mockResolvedValue({ teachers: [] });

    const event = {
      body: JSON.stringify({ email: 'unknown@school.com' }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(404);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Teacher not found');
  });
});