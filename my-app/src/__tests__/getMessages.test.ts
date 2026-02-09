// src/handlers/getMessages.test.ts
import { handler } from '../handlers/getMessages';
import { GraphQLClient } from 'graphql-request';

jest.mock('graphql-request');

describe('getMessages Handler', () => {
  const mockChatId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully fetch and format messages', async () => {
    const mockMessages = [
      { id: 1, content: 'Hi', created_at: '10:00', sender_id: 1, sender_type: 'teacher' },
      { id: 2, content: 'Hello', created_at: '10:01', sender_id: 2, sender_type: 'parent' }
    ];

    (GraphQLClient.prototype.request as jest.Mock)
      .mockResolvedValueOnce({ messages: mockMessages }) // Fetch messages
      .mockResolvedValueOnce({ teachers_by_pk: { name: 'Teacher Joe' } }) // Resolve sender 1
      .mockResolvedValueOnce({ parents_by_pk: { name: 'Parent Jane' } }); // Resolve sender 2

    const event = {
      body: JSON.stringify({ chat_id: mockChatId }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.messages[0].sender_name).toBe('Teacher Joe');
    expect(body.messages[1].sender_name).toBe('Parent Jane');
  });

  it('should return 400 when chat_id is missing', async () => {
    const event = { body: JSON.stringify({}), httpMethod: 'POST' } as any;
    const result = await handler(event);
    
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toContain('Missing required field');
  });
});