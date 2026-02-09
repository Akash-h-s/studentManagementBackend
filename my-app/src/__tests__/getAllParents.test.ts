import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler as getAllParentsHandler } from '../handlers/getAllParents';

// Mock the entire graphql-request module
jest.mock('graphql-request', () => {
  const mockRequest = jest.fn();
  return {
    GraphQLClient: jest.fn().mockImplementation(() => ({
      request: mockRequest
    })),
    __mockRequest: mockRequest
  };
});

import { GraphQLClient } from 'graphql-request';
const mockRequest = (GraphQLClient as any).prototype.request || (require('graphql-request') as any).__mockRequest;

describe('Get All Parents Handler Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    process.env.HASURA_ENDPOINT = 'http://test-endpoint/v1/graphql';
    process.env.HASURA_ADMIN_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  const createMockEvent = (httpMethod: string = 'POST'): APIGatewayProxyEvent => ({
    body: '',
    headers: {},
    multiValueHeaders: {},
    httpMethod,
    isBase64Encoded: false,
    path: '/get-all-parents',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: ''
  });

  // Test 1: OPTIONS request
  it('should handle OPTIONS request correctly', async () => {
    const event = createMockEvent('OPTIONS');
    const result = await getAllParentsHandler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toMatchObject({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    expect(result.body).toBe('');
  });

  // Test 2: Successfully fetch all parents with students
  it('should successfully fetch all parents with their students', async () => {
    const mockParentsData = {
      parents: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          students: [{ name: 'Alice Doe' }]
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          students: [{ name: 'Bob Smith' }]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike@example.com',
          students: [{ name: 'Charlie Johnson' }]
        }
      ]
    };

    mockRequest.mockResolvedValue(mockParentsData);

    const event = createMockEvent('GET');
    const result = await getAllParentsHandler(event);

    expect(result.statusCode).toBe(200);
    expect(mockRequest).toHaveBeenCalledWith(
      expect.stringContaining('query GetAllParents')
    );

    const body = JSON.parse(result.body);
    expect(body.success).toBe(true);
    expect(body.parents).toHaveLength(3);
    expect(body.parents[0]).toMatchObject({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'parent',
      student_name: 'Alice Doe'
    });
  });

  // Test 3: Handle parents with no students
  it('should handle parents with no students', async () => {
    const mockParentsData = {
      parents: [
        {
          id: 1,
          name: 'Parent Without Student',
          email: 'parent@example.com',
          students: []
        }
      ]
    };

    mockRequest.mockResolvedValue(mockParentsData);

    const event = createMockEvent('GET');
    const result = await getAllParentsHandler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(true);
    expect(body.parents[0].student_name).toBeNull();
  });

  // Test 4: Handle empty parents list
  it('should handle empty parents list successfully', async () => {
    const mockParentsData = { parents: [] };
    mockRequest.mockResolvedValue(mockParentsData);

    const event = createMockEvent('GET');
    const result = await getAllParentsHandler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(true);
    expect(body.parents).toHaveLength(0);
  });

  // Test 5: Handle GraphQL errors
  it('should handle GraphQL errors and return 500', async () => {
    mockRequest.mockRejectedValue(new Error('Database connection failed'));

    const event = createMockEvent('GET');
    const result = await getAllParentsHandler(event);

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Error getting parents');
    expect(body.error).toBe('Database connection failed');
  });
});