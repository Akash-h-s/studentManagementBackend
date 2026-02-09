import { handler } from '../handlers/sendMessage';
import { GraphQLClient } from 'graphql-request';

jest.mock('graphql-request');

describe('sendMessage Handler', () => {
  const mockMutationResponse = {
    insert_messages_one: {
      id: 50,
      content: 'Hello World',
      created_at: '2026-01-30T10:00:00Z',
      sender_id: 1,
      sender_type: 'teacher'
    },
    update_chats_by_pk: { id: 10 }
  };

  const mockTeacherResponse = {
    teachers_by_pk: { id: 1, name: 'Mr. Smith', email: 'smith@school.com' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully send a message and enrich with sender name', async () => {
    // First call: Mutation, Second call: getUserInfo query
    (GraphQLClient.prototype.request as jest.Mock)
      .mockResolvedValueOnce(mockMutationResponse)
      .mockResolvedValueOnce(mockTeacherResponse);

    const event = {
      body: JSON.stringify({
        chat_id: 10,
        sender_id: 1,
        sender_type: 'teacher',
        content: 'Hello World'
      }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message.sender_name).toBe('Mr. Smith');
    expect(body.message.content).toBe('Hello World');
  });

  it('should return 400 if required fields are missing', async () => {
    const event = {
      body: JSON.stringify({ chat_id: 10 }), // Missing content and sender info
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toContain('Missing required fields');
  });

  it('should use the correct table for parents in getUserInfo', async () => {
    const mockParentResponse = {
      parents_by_pk: { id: 2, name: 'Jane Parent' }
    };

    (GraphQLClient.prototype.request as jest.Mock)
      .mockResolvedValueOnce({ 
        ...mockMutationResponse, 
        insert_messages_one: { ...mockMutationResponse.insert_messages_one, sender_type: 'parent' } 
      })
      .mockResolvedValueOnce(mockParentResponse);

    const event = {
      body: JSON.stringify({
        chat_id: 10, sender_id: 2, sender_type: 'parent', content: 'Hi!'
      }),
      httpMethod: 'POST'
    } as any;

    await handler(event);
    
    // Check that the second call (getUserInfo) targets parents table
    const secondCallQuery = (GraphQLClient.prototype.request as jest.Mock).mock.calls[1][0];
    expect(secondCallQuery).toContain('parents_by_pk');
  });

  it('should default to "Unknown" if sender info is not found', async () => {
    (GraphQLClient.prototype.request as jest.Mock)
      .mockResolvedValueOnce(mockMutationResponse)
      .mockResolvedValueOnce({ teachers_by_pk: null }); // User missing

    const event = {
      body: JSON.stringify({
        chat_id: 10, sender_id: 1, sender_type: 'teacher', content: 'Hello'
      }),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    expect(JSON.parse(result.body).message.sender_name).toBe('Unknown');
  });
});