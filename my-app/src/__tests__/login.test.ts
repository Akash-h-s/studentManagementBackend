// src/handlers/login.test.ts
import { handler } from '../handlers/login';
import { gqlSdk } from '../config/graphClient';
import bcrypt from 'bcryptjs';

jest.mock('../config/graphClient');
jest.mock('bcryptjs');

describe('Login Handler', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should successfully log in an admin with a valid password', async () => {
    const mockAdmin = { id: 1, name: 'Boss', password_hash: 'hashed_pwd' };
    (gqlSdk.GetAdminByEmail as jest.Mock).mockResolvedValue({ admins: [mockAdmin] });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const event = {
      body: JSON.stringify({ role: 'admin', identifier: 'admin@test.com', password: 'password123' }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.user.role).toBe('admin');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_pwd');
  });

  it('should log in a student using admission number and name', async () => {
    const mockStudent = { id: 50, name: 'Kiddo' };
    (gqlSdk.GetStudentByAdmissionNumber as jest.Mock).mockResolvedValue({ students: [mockStudent] });

    const event = {
      body: JSON.stringify({ 
        role: 'student', 
        identifier: 'AD-001', 
        studentName: 'Kiddo' 
      }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.user.name).toBe('Kiddo');
    // Ensure bcrypt wasn't even called for students
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});