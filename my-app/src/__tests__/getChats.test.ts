// src/handlers/getChats.test.ts
import { handler } from '../handlers/getChats';
import { GraphQLClient } from 'graphql-request';
import { APIGatewayProxyEvent } from 'aws-lambda';

// Mock the GraphQLClient
jest.mock('graphql-request');

describe('getChats Handler', () => {
  const mockUserId = 1;
  const mockChatId = 'chat-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createEvent = (body: any): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    httpMethod: 'POST',
  } as any);

  // 1. Success Path
  it('should return 200 and formatted chats on success', async () => {
    const mockChatResponse = {
      chats: [{
        id: mockChatId,
        type: 'direct',
        chat_participants: [
          { user_id: 1, user_type: 'teacher' },
          { user_id: 2, user_type: 'parent' }
        ],
        messages: [{
          id: 'msg-1',
          content: 'Hello!',
          created_at: '2023-01-01T00:00:00Z',
          sender_id: 2,
          sender_type: 'parent'
        }]
      }]
    };

    const mockUserResponse = {
      teachers_by_pk: { id: 1, name: 'Teacher Joe', email: 'joe@school.com' },
      parents_by_pk: { id: 2, name: 'Parent Jane', email: 'jane@home.com' }
    };

    (GraphQLClient.prototype.request as jest.Mock)
      .mockResolvedValueOnce(mockChatResponse) // First call: getChats
      .mockResolvedValueOnce({ teachers_by_pk: mockUserResponse.teachers_by_pk }) // Participant 1
      .mockResolvedValueOnce({ parents_by_pk: mockUserResponse.parents_by_pk })   // Participant 2
      .mockResolvedValueOnce({ parents_by_pk: mockUserResponse.parents_by_pk });  // Message Sender

    const event = createEvent({ user_id: mockUserId });
    const result = await handler(event);

    const body = JSON.parse(result.body);
    expect(result.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.chats[0].name).toBe('Parent Jane'); // Direct chat uses other user's name
    expect(body.chats[0].last_message.sender_name).toBe('Parent Jane');
  });

  // 2. Missing Input
  it('should return 400 if user_id is missing', async () => {
    const event = createEvent({});
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toContain('Missing required field');
  });

  // 3. Empty State
  it('should return empty array if user has no chats', async () => {
    (GraphQLClient.prototype.request as jest.Mock).mockResolvedValueOnce({ chats: [] });

    const event = createEvent({ user_id: 999 });
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).chats).toHaveLength(0);
  });

  // 4. OPTIONS/CORS handling
  it('should return 200 for OPTIONS requests', async () => {
    const event = { httpMethod: 'OPTIONS' } as any;
    const result = await handler(event);
    expect(result.statusCode).toBe(200);
  });

  // 5. Service Failure
  it('should return 500 if the database query fails', async () => {
    (GraphQLClient.prototype.request as jest.Mock).mockRejectedValueOnce(new Error('DB Down'));

    const event = createEvent({ user_id: mockUserId });
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).success).toBe(false);
  });
});