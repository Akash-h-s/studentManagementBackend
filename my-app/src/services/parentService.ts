import { client } from '../lib/graphqlClient';
import { GET_ALL_PARENTS } from '../graphql/operations';

export const SEARCH_PARENTS = `
  query SearchParents($search: String!) {
    parents(
      where: {
        _or: [
          { name: { _ilike: $search } }
          { email: { _ilike: $search } }
        ]
      }
      order_by: { name: asc }
    ) {
      id
      name
      email
      students {
        name
      }
    }
  }
`;

export class ParentService {
  static async getAllParents() {
    const result: any = await client.request(GET_ALL_PARENTS);

    return result.parents.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: 'parent',
      student_name: p.students?.[0]?.name || null
    }));
  }

  static async searchParents(searchQuery: string) {
    const result: any = await client.request(SEARCH_PARENTS, {
      search: `%${searchQuery}%`
    });

    return result.parents.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: 'parent',
      student_name: p.students?.[0]?.name || null,
      chat_id: null
    }));
  }
}


