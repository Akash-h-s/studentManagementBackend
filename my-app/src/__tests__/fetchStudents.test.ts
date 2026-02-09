import { handler } from '../handlers/fetchStudents';
import { sdk } from '../lib/graphqlClient';

// Mock the generated SDK
jest.mock('../lib/graphqlClient', () => ({
  sdk: {
    GetStudentsByClassSection: jest.fn(),
  },
}));

describe('fetchStudents Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully fetch students for a valid class and section', async () => {
    const mockStudents = [
      { id: 1, name: 'Alice Smith' },
      { id: 2, name: 'Bob Jones' }
    ];
    
    (sdk.GetStudentsByClassSection as jest.Mock).mockResolvedValue({
      students: mockStudents
    });

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ class_name: '10A', section_name: 'Alpha' })
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.count).toBe(2);
    expect(body.students).toEqual(mockStudents);
    expect(sdk.GetStudentsByClassSection).toHaveBeenCalledWith({
      class_name: '10A',
      section_name: 'Alpha'
    });
  });

  it('should trim inputs before calling the database', async () => {
    (sdk.GetStudentsByClassSection as jest.Mock).mockResolvedValue({ students: [] });

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ class_name: '  10A  ', section_name: '  B  ' })
    } as any;

    await handler(event);

    expect(sdk.GetStudentsByClassSection).toHaveBeenCalledWith({
      class_name: '10A',
      section_name: 'B'
    });
  });

  it('should return 400 if class_name is missing', async () => {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ section_name: 'Alpha' }) // missing class_name
    } as any;

    const result = await handler(event);
    
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).success).toBe(false);
    expect(sdk.GetStudentsByClassSection).not.toHaveBeenCalled();
  });

  it('should return 500 if the GraphQL SDK throws an error', async () => {
    (sdk.GetStudentsByClassSection as jest.Mock).mockRejectedValue(new Error('Database Timeout'));

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ class_name: '10A', section_name: 'Alpha' })
    } as any;

    const result = await handler(event);
    
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe('Internal server error');
  });
});