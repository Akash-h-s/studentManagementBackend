import { client } from '../lib/graphqlClient';
import { GET_USER_INFO } from '../graphql/operations';

export class UserService {
  static async getUserInfo(userId: number, userType: string) {
    const table = userType === 'teacher' ? 'teachers' : 'parents';
    const query = GET_USER_INFO(table);

    try {
      const result: any = await client.request(query, { id: userId });
      const user = result[`${table}_by_pk`];
      return user ? { ...user, role: userType } : null;
    } catch (error) {
      console.error(`Error fetching user info for ${userType} with id ${userId}:`, error);
      throw error;
    }
  }
}

