import { handler } from '../handlers/searchParents';
import { GraphQLClient } from 'graphql-request';

jest.mock('graphql-request');

describe('searchParents Handler', () => {
  const mockParentsData = {
    parents: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        students: [{ name: 'Junior Doe' }]
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all parents when search_query is missing', async () => {
    (GraphQLClient.prototype.request as jest.Mock).mockResolvedValue(mockParentsData);

    const event = {
      body: JSON.stringify({}),
      httpMethod: 'POST'
    } as any;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.parents).toHaveLength(1);
    expect(body.parents[0].student_name).toBe('Junior Doe');
    // Ensure the "all" query was used (usually verified by checking if variables were passed)
    expect(GraphQLClient.prototype.request).toHaveBeenCalledWith(expect.stringContaining('GetAllParents'));
  });

  it('should filter parents with wildcards when search_query is provided', async () => {
    (GraphQLClient.prototype.request as jest.Mock).mockResolvedValue(mockParentsData);

    const event = {
      body: JSON.stringify({ search_query: 'john' }),
      httpMethod: 'POST'
    } as any;

    await handler(event);

    expect(GraphQLClient.prototype.request).toHaveBeenCalledWith(
      expect.stringContaining('SearchParents'),
      { search: '%john%' }
    );
  });

  it('should return null for student_name if parent has no students', async () => {
    const parentNoKids = {
      parents: [{ id: 2, name: 'Jane Smith', email: 'jane@test.com', students: [] }]
    };
    (GraphQLClient.prototype.request as jest.Mock).mockResolvedValue(parentNoKids);

    const event = { body: JSON.stringify({}), httpMethod: 'POST' } as any;
    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(body.parents[0].student_name).toBeNull();
  });

  it('should return 500 on client request failure', async () => {
    (GraphQLClient.prototype.request as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const event = { body: JSON.stringify({}), httpMethod: 'POST' } as any;
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).success).toBe(false);
  });
});