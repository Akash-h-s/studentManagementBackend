import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler as createChatHandler } from '../handlers/createChat';

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

describe('Create Chat Handler Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    process.env.HASURA_ENDPOINT = 'http://test-endpoint/v1/graphql';
    process.env.HASURA_ADMIN_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  const createMockEvent = (body: any, httpMethod: string = 'POST'): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    headers: {},
    multiValueHeaders: {},
    httpMethod,
    isBase64Encoded: false,
    path: '/create-chat',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: ''
  });

  describe('OPTIONS Request', () => {
    it('should handle OPTIONS request correctly', async () => {
      const event = createMockEvent({}, 'OPTIONS');
      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      expect(result.body).toBe('');
    });
  });

  describe('Validation Tests', () => {
    it('should return 400 if type is missing', async () => {
      const event = createMockEvent({
        participants: [{ user_id: 1, user_type: 'teacher' }]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Missing required field: type');
    });

    it('should return 400 if direct chat does not have exactly 2 participants', async () => {
      const event = createMockEvent({
        type: 'direct',
        participants: [{ user_id: 1, user_type: 'teacher' }]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toContain('Direct chat requires exactly 2 participants');
    });

    it('should return 400 if group chat is missing required fields', async () => {
      const event = createMockEvent({
        type: 'group',
        name: 'Test Group'
        // Missing created_by and members
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toContain('Group chat requires name, created_by, and at least 2 members');
    });

    it('should return 400 if group chat has less than 2 members', async () => {
      const event = createMockEvent({
        type: 'group',
        name: 'Test Group',
        created_by: 1,
        members: [{ user_id: 2, user_type: 'parent' }]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toContain('at least 2 members');
    });

    it('should return 400 for invalid chat type', async () => {
      const event = createMockEvent({
        type: 'invalid_type',
        participants: []
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Invalid chat type. Must be "direct" or "group"');
    });
  });

  describe('Direct Chat Creation', () => {
    it('should create a new direct chat successfully', async () => {
      const mockCheckResult = { chats: [] };
      const mockCreateResult = {
        insert_chats_one: {
          id: 1,
          type: 'direct',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'parent' }
          ]
        }
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 1, name: 'Teacher One', email: 'teacher@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: { id: 2, name: 'Parent One', email: 'parent@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult) // Check for existing chat
        .mockResolvedValueOnce(mockCreateResult) // Create chat
        .mockResolvedValueOnce(mockTeacherInfo) // Get teacher info
        .mockResolvedValueOnce(mockParentInfo); // Get parent info

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledTimes(4);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat).toMatchObject({
        id: 1,
        type: 'direct',
        name: 'Parent One',
        unread_count: 0
      });
      expect(body.chat.participants).toHaveLength(2);
      expect(body.chat.participants[0]).toMatchObject({
        id: 1,
        name: 'Teacher One',
        email: 'teacher@test.com',
        role: 'teacher'
      });
    });

    it('should return existing direct chat if already exists', async () => {
      const mockCheckResult = {
        chats: [{
          id: 5,
          type: 'direct',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'parent' }
          ]
        }]
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 1, name: 'Teacher One', email: 'teacher@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: { id: 2, name: 'Parent One', email: 'parent@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult) // Check finds existing chat
        .mockResolvedValueOnce(mockTeacherInfo) // Get teacher info
        .mockResolvedValueOnce(mockParentInfo); // Get parent info

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledTimes(3); // No create call
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat.id).toBe(5);
      expect(body.chat.type).toBe('direct');
    });

    it('should handle direct chat with simple participant format (just IDs)', async () => {
      const mockCheckResult = { chats: [] };
      const mockCreateResult = {
        insert_chats_one: {
          id: 2,
          type: 'direct',
          chat_participants: [
            { user_id: 10, user_type: 'teacher' },
            { user_id: 20, user_type: 'parent' }
          ]
        }
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 10, name: 'Teacher Two', email: 'teacher2@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: { id: 20, name: 'Parent Two', email: 'parent2@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce(mockCreateResult)
        .mockResolvedValueOnce(mockTeacherInfo)
        .mockResolvedValueOnce(mockParentInfo);

      const event = createMockEvent({
        type: 'direct',
        participants: [10, 20] // Simple format
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat.id).toBe(2);
    });

    it('should handle missing user info gracefully', async () => {
      const mockCheckResult = { chats: [] };
      const mockCreateResult = {
        insert_chats_one: {
          id: 3,
          type: 'direct',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 999, user_type: 'parent' }
          ]
        }
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 1, name: 'Teacher One', email: 'teacher@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: null // User not found
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce(mockCreateResult)
        .mockResolvedValueOnce(mockTeacherInfo)
        .mockResolvedValueOnce(mockParentInfo);

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 999, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat.name).toBe('Unknown'); // Fallback when user not found
      expect(body.chat.participants).toHaveLength(1); // Only found user
    });
  });

  describe('Group Chat Creation', () => {
    it('should create a new group chat successfully', async () => {
      const mockCreateResult = {
        insert_chats_one: {
          id: 10,
          type: 'group',
          name: 'Study Group',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'parent' },
            { user_id: 3, user_type: 'parent' }
          ]
        }
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 1, name: 'Teacher One', email: 'teacher@test.com' }
      };
      const mockParent1Info = {
        parents_by_pk: { id: 2, name: 'Parent One', email: 'parent1@test.com' }
      };
      const mockParent2Info = {
        parents_by_pk: { id: 3, name: 'Parent Two', email: 'parent2@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCreateResult) // Create group
        .mockResolvedValueOnce(mockTeacherInfo) // Get teacher info
        .mockResolvedValueOnce(mockParent1Info) // Get parent 1 info
        .mockResolvedValueOnce(mockParent2Info); // Get parent 2 info

      const event = createMockEvent({
        type: 'group',
        name: 'Study Group',
        created_by: 1,
        members: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' },
          { user_id: 3, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledTimes(4);
      
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat).toMatchObject({
        id: 10,
        type: 'group',
        name: 'Study Group',
        unread_count: 0
      });
      expect(body.chat.participants).toHaveLength(3);
    });

    it('should handle group chat with simple member format', async () => {
      const mockCreateResult = {
        insert_chats_one: {
          id: 11,
          type: 'group',
          name: 'Simple Group',
          chat_participants: [
            { user_id: 5, user_type: 'parent' },
            { user_id: 6, user_type: 'parent' }
          ]
        }
      };
      const mockParent1Info = {
        parents_by_pk: { id: 5, name: 'Parent Five', email: 'parent5@test.com' }
      };
      const mockParent2Info = {
        parents_by_pk: { id: 6, name: 'Parent Six', email: 'parent6@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCreateResult)
        .mockResolvedValueOnce(mockParent1Info)
        .mockResolvedValueOnce(mockParent2Info);

      const event = createMockEvent({
        type: 'group',
        name: 'Simple Group',
        created_by: 5,
        members: [5, 6] // Simple format
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat.name).toBe('Simple Group');
      expect(body.chat.participants).toHaveLength(2);
    });

    it('should create group with mixed user types', async () => {
      const mockCreateResult = {
        insert_chats_one: {
          id: 12,
          type: 'group',
          name: 'Mixed Group',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'teacher' },
            { user_id: 3, user_type: 'parent' }
          ]
        }
      };
      const mockTeacher1Info = {
        teachers_by_pk: { id: 1, name: 'Teacher One', email: 'teacher1@test.com' }
      };
      const mockTeacher2Info = {
        teachers_by_pk: { id: 2, name: 'Teacher Two', email: 'teacher2@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: { id: 3, name: 'Parent One', email: 'parent1@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCreateResult)
        .mockResolvedValueOnce(mockTeacher1Info)
        .mockResolvedValueOnce(mockTeacher2Info)
        .mockResolvedValueOnce(mockParentInfo);

      const event = createMockEvent({
        type: 'group',
        name: 'Mixed Group',
        created_by: 1,
        members: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'teacher' },
          { user_id: 3, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(true);
      expect(body.chat.participants).toHaveLength(3);
      expect(body.chat.participants.filter((p: any) => p.role === 'teacher')).toHaveLength(2);
      expect(body.chat.participants.filter((p: any) => p.role === 'parent')).toHaveLength(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle GraphQL errors when checking for existing chat', async () => {
      mockRequest.mockRejectedValue(new Error('Database connection failed'));

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(500);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Error creating chat');
      expect(body.error).toBe('Database connection failed');
    });

    it('should handle GraphQL errors when creating chat', async () => {
      const mockCheckResult = { chats: [] };
      
      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockRejectedValueOnce(new Error('Insert failed: constraint violation'));

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(500);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Insert failed: constraint violation');
    });

    it('should handle errors when fetching user info', async () => {
      const mockCheckResult = { chats: [] };
      const mockCreateResult = {
        insert_chats_one: {
          id: 1,
          type: 'direct',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'parent' }
          ]
        }
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce(mockCreateResult)
        .mockRejectedValueOnce(new Error('User fetch failed'));

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(500);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('User fetch failed');
    });

    it('should handle malformed JSON in request body', async () => {
      const event = createMockEvent({}, 'POST');
      event.body = 'invalid json {';

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(500);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Error creating chat');
    });

    it('should handle empty request body', async () => {
      const event = createMockEvent({}, 'POST');
      event.body = '';

      const result = await createChatHandler(event);

      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Missing required field: type');
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in successful responses', async () => {
      const mockCheckResult = { chats: [] };
      const mockCreateResult = {
        insert_chats_one: {
          id: 1,
          type: 'direct',
          chat_participants: [
            { user_id: 1, user_type: 'teacher' },
            { user_id: 2, user_type: 'parent' }
          ]
        }
      };
      const mockTeacherInfo = {
        teachers_by_pk: { id: 1, name: 'Teacher', email: 'teacher@test.com' }
      };
      const mockParentInfo = {
        parents_by_pk: { id: 2, name: 'Parent', email: 'parent@test.com' }
      };

      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce(mockCreateResult)
        .mockResolvedValueOnce(mockTeacherInfo)
        .mockResolvedValueOnce(mockParentInfo);

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
    });

    it('should include CORS headers in error responses', async () => {
      mockRequest.mockRejectedValue(new Error('Test error'));

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ]
      });

      const result = await createChatHandler(event);

      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*'
      });
    });
  });

  describe('GraphQL Query/Mutation Verification', () => {
    it('should call check query with correct parameters for direct chat', async () => {
      const mockCheckResult = { chats: [] };
      
      mockRequest.mockResolvedValueOnce(mockCheckResult);

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 5, user_type: 'teacher' },
          { user_id: 10, user_type: 'parent' }
        ]
      });

      try {
        await createChatHandler(event);
      } catch (e) {
        // May fail on subsequent calls, but we only care about the first
      }

      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('query CheckDirectChat'),
        { user1: 5, user2: 10 }
      );
    });

    it('should call create mutation with correct participants data', async () => {
      const mockCheckResult = { chats: [] };
      
      mockRequest
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce({
          insert_chats_one: {
            id: 1,
            type: 'direct',
            chat_participants: []
          }
        });

      const event = createMockEvent({
        type: 'direct',
        participants: [
          { user_id: 3, user_type: 'teacher' },
          { user_id: 7, user_type: 'parent' }
        ]
      });

      try {
        await createChatHandler(event);
      } catch (e) {
        // May fail on user fetch
      }

      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('mutation CreateDirectChat'),
        {
          participants: [
            { user_id: 3, user_type: 'teacher' },
            { user_id: 7, user_type: 'parent' }
          ]
        }
      );
    });
  });
});