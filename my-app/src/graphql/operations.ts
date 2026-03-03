// src/graphql/operations.ts

/**
 * User related queries
 */
export const GET_USER_INFO = (table: string) => `
  query GetUser($id: Int!) {
    ${table}_by_pk(id: $id) {
      id
      name
      email
    }
  }
`;

/**
 * Chat related queries and mutations
 */
export const CHECK_DIRECT_CHAT = `
  query CheckDirectChat($user1: Int!, $user2: Int!) {
    chats(
      where: {
        type: { _eq: "direct" }
        _and: [
          { chat_participants: { user_id: { _eq: $user1 } } }
          { chat_participants: { user_id: { _eq: $user2 } } }
        ]
      }
      limit: 1
    ) {
      id
      type
      chat_participants {
        user_id
        user_type
      }
    }
  }
`;

export const CREATE_DIRECT_CHAT = `
  mutation CreateDirectChat($participants: [chat_participants_insert_input!]!) {
    insert_chats_one(
      object: {
        type: "direct"
        chat_participants: {
          data: $participants
        }
      }
    ) {
      id
      type
      chat_participants {
        user_id
        user_type
      }
    }
  }
`;

export const CREATE_GROUP_CHAT = `
  mutation CreateGroup($name: String!, $members: [chat_participants_insert_input!]!) {
    insert_chats_one(
      object: {
        type: "group"
        name: $name
        chat_participants: {
          data: $members
        }
      }
    ) {
      id
      type
      name
      chat_participants {
        user_id
        user_type
      }
    }
  }
`;

export const GET_CHATS = `
  query GetChats($user_id: Int!) {
    chats(
      where: {
        chat_participants: {
          user_id: { _eq: $user_id }
        }
      }
      order_by: { updated_at: desc }
    ) {
      id
      type
      name
      chat_participants {
        user {
          id
          name
          email
        }
      }
      messages(order_by: { created_at: desc }, limit: 1) {
        id
        content
        created_at
        sender {
          id
          name
        }
      }
    }
  }
`;

export const GET_MESSAGES = `
  query GetMessages($chat_id: Int!) {
    messages(
      where: { chat_id: { _eq: $chat_id } }
      order_by: { created_at: asc }
    ) {
      id
      content
      created_at
      sender {
        id
        name
      }
    }
  }
`;

export const SEND_MESSAGE = `
  mutation SendMessage($chat_id: Int!, $sender_id: Int!, $content: String!) {
    insert_messages_one(
      object: {
        chat_id: $chat_id
        sender_id: $sender_id
        content: $content
      }
    ) {
      id
      content
      created_at
      sender {
        id
        name
      }
    }
    update_chats_by_pk(
      pk_columns: { id: $chat_id }
      _set: { updated_at: "now()" }
    ) {
      id
    }
  }
`;

/**
 * Marks related queries
 */
export const FIND_SUBJECT = `
  query FindSubject($name: String!, $class_name: String!) {
    subjects(where: { name: { _eq: $name }, class_name: { _eq: $class_name } }) {
      id
    }
  }
`;

export const CREATE_SUBJECT = `
  mutation CreateSubject($name: String!, $class_name: String!, $teacher_id: Int!) {
    insert_subjects_one(object: { name: $name, class_name: $class_name, teacher_id: $teacher_id }) {
      id
    }
  }
`;

export const FIND_EXAM = `
  query FindExam($name: String!, $academic_year: String!) {
    exams(where: { name: { _eq: $name }, academic_year: { _eq: $academic_year } }) {
      id
    }
  }
`;

export const CREATE_EXAM = `
  mutation CreateExam($name: String!, $academic_year: String!) {
    insert_exams_one(object: { name: $name, academic_year: $academic_year }) {
      id
    }
  }
`;

/**
 * Parent related queries
 */
export const GET_ALL_PARENTS = `
  query GetAllParents {
    parents(order_by: { name: asc }) {
      id
      name
      email
      students {
        name
      }
    }
  }
`;
