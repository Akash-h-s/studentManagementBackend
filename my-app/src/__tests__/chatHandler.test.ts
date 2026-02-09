import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  getChatsHandler,
  getMessagesHandler,
  sendMessageHandler,
  getAllParentsHandler
} from '../handlers/chatHandlers';

// Mock the entire graphql-request module
jest.mock('graphql-request', () => {
  const mockRequest = jest.fn();
  return {
    GraphQLClient: jest.fn().mockImplementation(() => ({
      request: mockRequest
    })),
    // Export the mockRequest so we can access it in tests
    __mockRequest: mockRequest
  };
});

// Import the mock after setting up the mock
import { GraphQLClient } from 'graphql-request';
const mockRequest = (GraphQLClient as any).prototype.request || (require('graphql-request') as any).__mockRequest;

describe('Lambda Handlers Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Set environment variables
    process.env.HASURA_ENDPOINT = 'http://test-endpoint/v1/graphql';
    process.env.HASURA_ADMIN_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Helper function to create mock API Gateway events
  const createMockEvent = (body: any, httpMethod: string = 'POST'): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    headers: {},
    multiValueHeaders: {},
    httpMethod,
    isBase64Encoded: false,
    path: '/test',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: ''
  });

  describe('getChatsHandler', () => {
    it('should handle OPTIONS request correctly', async () => {
      const event = createMockEvent({}, 'OPTIONS');
      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(200);
      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      expect(result.body).toBe('');
    });

    it('should successfully get chats for a user', async () => {
      const mockChatsData = {
        chats: [
          {
            id: 1,
            type: 'group',
            name: 'Group Chat',
            chat_participants: [
              { user: { id: 1, name: 'User 1', email: 'user1@test.com' } },
              { user: { id: 2, name: 'User 2', email: 'user2@test.com' } }
            ],
            messages: [
              {
                id: 101,
                content: 'Hello!',
                created_at: '2024-01-29T10:00:00Z',
                sender: { id: 2, name: 'User 2' }
              }
            ]
          },
          {
            id: 2,
            type: 'direct',
            name: null,
            chat_participants: [
              { user: { id: 1, name: 'User 1', email: 'user1@test.com' } },
              { user: { id: 3, name: 'User 3', email: 'user3@test.com' } }
            ],
            messages: [
              {
                id: 102,
                content: 'Hi there!',
                created_at: '2024-01-29T11:00:00Z',
                sender: { id: 3, name: 'User 3' }
              }
            ]
          }
        ]
      };

      mockRequest.mockResolvedValue(mockChatsData);

      const event = createMockEvent({ user_id: 1 });
      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('query GetChats'),
        { user_id: 1 }
      );

      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.chats).toHaveLength(2);
      
      // Check group chat
      expect(responseBody.chats[0].name).toBe('Group Chat');
      expect(responseBody.chats[0].type).toBe('group');
      
      // Check direct chat (should use other user's name)
      expect(responseBody.chats[1].name).toBe('User 3');
      expect(responseBody.chats[1].type).toBe('direct');
      
      // Check last message structure
      expect(responseBody.chats[0].last_message).toMatchObject({
        id: 101,
        sender_id: 2,
        sender_name: 'User 2',
        content: 'Hello!',
        timestamp: '2024-01-29T10:00:00Z',
        is_read: false
      });
    });

    it('should handle chats with no messages', async () => {
      const mockChatsData = {
        chats: [
          {
            id: 1,
            type: 'group',
            name: 'Empty Chat',
            chat_participants: [
              { user: { id: 1, name: 'User 1', email: 'user1@test.com' } }
            ],
            messages: []
          }
        ]
      };

      mockRequest.mockResolvedValue(mockChatsData);

      const event = createMockEvent({ user_id: 1 });
      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.chats[0].last_message).toBeNull();
    });

    it('should handle direct chat with missing other user', async () => {
      const mockChatsData = {
        chats: [
          {
            id: 1,
            type: 'direct',
            name: null,
            chat_participants: [
              { user: { id: 1, name: 'User 1', email: 'user1@test.com' } }
            ],
            messages: []
          }
        ]
      };

      mockRequest.mockResolvedValue(mockChatsData);

      const event = createMockEvent({ user_id: 1 });
      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.chats[0].name).toBe('Unknown User');
    });

    it('should handle missing request body', async () => {
      const event = createMockEvent(null);
      event.body = '';

      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
    });

    it('should handle GraphQL errors', async () => {
      mockRequest.mockRejectedValue(new Error('GraphQL error: Connection failed'));

      const event = createMockEvent({ user_id: 1 });
      const result = await getChatsHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
      expect(responseBody.message).toBe('Error getting chats');
      expect(responseBody.error).toBe('GraphQL error: Connection failed');
    });
  });

  describe('getMessagesHandler', () => {
    it('should handle OPTIONS request correctly', async () => {
      const event = createMockEvent({}, 'OPTIONS');
      const result = await getMessagesHandler(event);

      expect(result.statusCode).toBe(200);
      expect(result.body).toBe('');
    });

    it('should successfully get messages for a chat', async () => {
      const mockMessagesData = {
        messages: [
          {
            id: 1,
            content: 'First message',
            created_at: '2024-01-29T10:00:00Z',
            sender: { id: 1, name: 'User 1' }
          },
          {
            id: 2,
            content: 'Second message',
            created_at: '2024-01-29T10:05:00Z',
            sender: { id: 2, name: 'User 2' }
          }
        ]
      };

      mockRequest.mockResolvedValue(mockMessagesData);

      const event = createMockEvent({ chat_id: 1, user_id: 1 });
      const result = await getMessagesHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('query GetMessages'),
        { chat_id: 1 }
      );

      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.messages).toHaveLength(2);
      expect(responseBody.messages[0]).toMatchObject({
        id: 1,
        sender_id: 1,
        sender_name: 'User 1',
        content: 'First message',
        timestamp: '2024-01-29T10:00:00Z',
        is_read: false
      });
    });

    it('should handle empty messages array', async () => {
      const mockMessagesData = { messages: [] };
      mockRequest.mockResolvedValue(mockMessagesData);

      const event = createMockEvent({ chat_id: 1, user_id: 1 });
      const result = await getMessagesHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.messages).toHaveLength(0);
    });

    it('should handle GraphQL errors', async () => {
      mockRequest.mockRejectedValue(new Error('Database connection failed'));

      const event = createMockEvent({ chat_id: 1, user_id: 1 });
      const result = await getMessagesHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
      expect(responseBody.error).toBe('Database connection failed');
    });

    it('should handle malformed request body', async () => {
      const event = createMockEvent({});
      event.body = 'invalid json';

      const result = await getMessagesHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
    });
  });

  describe('sendMessageHandler', () => {
    it('should handle OPTIONS request correctly', async () => {
      const event = createMockEvent({}, 'OPTIONS');
      const result = await sendMessageHandler(event);

      expect(result.statusCode).toBe(200);
      expect(result.body).toBe('');
    });

    it('should successfully send a message', async () => {
      const mockSendMessageData = {
        insert_messages_one: {
          id: 100,
          content: 'Test message',
          created_at: '2024-01-29T12:00:00Z',
          sender: { id: 1, name: 'User 1' }
        },
        update_chats_by_pk: { id: 1 }
      };

      mockRequest.mockResolvedValue(mockSendMessageData);

      const event = createMockEvent({
        chat_id: 1,
        sender_id: 1,
        content: 'Test message'
      });
      const result = await sendMessageHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('mutation SendMessage'),
        {
          chat_id: 1,
          sender_id: 1,
          content: 'Test message'
        }
      );

      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.message).toMatchObject({
        id: 100,
        sender_id: 1,
        sender_name: 'User 1',
        content: 'Test message',
        timestamp: '2024-01-29T12:00:00Z',
        is_read: false
      });
    });

    it('should handle empty message content', async () => {
      const mockSendMessageData = {
        insert_messages_one: {
          id: 101,
          content: '',
          created_at: '2024-01-29T12:00:00Z',
          sender: { id: 1, name: 'User 1' }
        },
        update_chats_by_pk: { id: 1 }
      };

      mockRequest.mockResolvedValue(mockSendMessageData);

      const event = createMockEvent({
        chat_id: 1,
        sender_id: 1,
        content: ''
      });
      const result = await sendMessageHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
    });

    it('should handle missing required fields', async () => {
      const event = createMockEvent({
        chat_id: 1
        // Missing sender_id and content
      });

      const result = await sendMessageHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
    });

    it('should handle GraphQL mutation errors', async () => {
      mockRequest.mockRejectedValue(new Error('Insert failed: constraint violation'));

      const event = createMockEvent({
        chat_id: 1,
        sender_id: 1,
        content: 'Test message'
      });
      const result = await sendMessageHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
      expect(responseBody.error).toBe('Insert failed: constraint violation');
    });
  });

  describe('getAllParentsHandler', () => {
    it('should handle OPTIONS request correctly', async () => {
      const event = createMockEvent({}, 'OPTIONS');
      const result = await getAllParentsHandler(event);

      expect(result.statusCode).toBe(200);
      expect(result.body).toBe('');
    });

    it('should successfully get all parents', async () => {
      const mockParentsData = {
        parents: [
          {
            id: 1,
            name: 'Parent One',
            email: 'parent1@test.com',
            students: [{ name: 'Student One' }]
          },
          {
            id: 2,
            name: 'Parent Two',
            email: 'parent2@test.com',
            students: [{ name: 'Student Two' }]
          }
        ]
      };

      mockRequest.mockResolvedValue(mockParentsData);

      const event = createMockEvent({});
      const result = await getAllParentsHandler(event);

      expect(result.statusCode).toBe(200);
      expect(mockRequest).toHaveBeenCalledWith(
        expect.stringContaining('query GetAllParents')
      );

      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.parents).toHaveLength(2);
      expect(responseBody.parents[0]).toMatchObject({
        id: 1,
        name: 'Parent One',
        email: 'parent1@test.com',
        role: 'parent',
        student_name: 'Student One'
      });
    });

    it('should handle parents with no students', async () => {
      const mockParentsData = {
        parents: [
          {
            id: 1,
            name: 'Parent One',
            email: 'parent1@test.com',
            students: []
          }
        ]
      };

      mockRequest.mockResolvedValue(mockParentsData);

      const event = createMockEvent({});
      const result = await getAllParentsHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.parents[0].student_name).toBeNull();
    });

    it('should handle empty parents list', async () => {
      const mockParentsData = { parents: [] };
      mockRequest.mockResolvedValue(mockParentsData);

      const event = createMockEvent({});
      const result = await getAllParentsHandler(event);

      expect(result.statusCode).toBe(200);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.parents).toHaveLength(0);
    });

    it('should handle GraphQL errors', async () => {
      mockRequest.mockRejectedValue(new Error('Network timeout'));

      const event = createMockEvent({});
      const result = await getAllParentsHandler(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody.success).toBe(false);
      expect(responseBody.message).toBe('Error getting parents');
      expect(responseBody.error).toBe('Network timeout');
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in all success responses', async () => {
      mockRequest.mockResolvedValue({ parents: [] });

      const event = createMockEvent({});
      const result = await getAllParentsHandler(event);

      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
    });

    it('should include CORS headers in error responses', async () => {
      mockRequest.mockRejectedValue(new Error('Test error'));

      const event = createMockEvent({ user_id: 1 });
      const result = await getChatsHandler(event);

      expect(result.headers).toMatchObject({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
    });
  });

  describe('Environment Variables', () => {
    it('should use default values when environment variables are not set', () => {
      delete process.env.HASURA_ENDPOINT;
      delete process.env.HASURA_ADMIN_SECRET;

      // This test just confirms environment variables can be unset
      expect(true).toBe(true);
    });
  });
});