// src/handlers/getStudentDetails.test.ts
import { handler } from '../handlers/getStudentDetails';
import { sdk } from '../lib/graphqlClient';

// Mock the generated SDK
jest.mock('../lib/graphqlClient', () => ({
  sdk: {
    GetStudentById: jest.fn(),
    GetStudentsByParentId: jest.fn(),
  },
}));

describe('getStudentDetails Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a specific student when studentId is provided', async () => {
    const mockStudent = { id: 101, name: 'Alice' };
    (sdk.GetStudentById as jest.Mock).mockResolvedValue({ 
      students_by_pk: mockStudent 
    });

    const event = {
      body: JSON.stringify({ studentId: 101 }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.data).toEqual([mockStudent]);
    expect(sdk.GetStudentById).toHaveBeenCalledWith({ id: 101 });
  });

  it('should return all students for a parent when parentId is provided', async () => {
    const mockStudents = [{ id: 101, name: 'Alice' }, { id: 102, name: 'Bob' }];
    (sdk.GetStudentsByParentId as jest.Mock).mockResolvedValue({ 
      students: mockStudents 
    });

    const event = {
      body: JSON.stringify({ parentId: 50 }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.data).toHaveLength(2);
    expect(sdk.GetStudentsByParentId).toHaveBeenCalledWith({ parentId: 50 });
  });
});