import { client } from '../lib/graphqlClient';
import { UserService } from './userService';
import {
  CHECK_DIRECT_CHAT,
  CREATE_DIRECT_CHAT,
  CREATE_GROUP_CHAT,
  GET_CHATS,
  GET_MESSAGES,
  SEND_MESSAGE
} from '../graphql/operations';

export class ChatService {
  static async findExistingDirectChat(user1: number, user2: number) {
    const checkResult: any = await client.request(CHECK_DIRECT_CHAT, {
      user1,
      user2
    });

    if (checkResult.chats.length > 0) {
      return checkResult.chats[0];
    }
    return null;
  }

  static async createDirectChat(user1: number, user1Type: string, user2: number, user2Type: string) {
    const participantsData = [
      { user_id: user1, user_type: user1Type },
      { user_id: user2, user_type: user2Type }
    ];

    const createResult: any = await client.request(CREATE_DIRECT_CHAT, {
      participants: participantsData
    });

    return createResult.insert_chats_one;
  }

  static async createGroupChat(name: string, members: any[]) {
    const membersData = members.map((m: any) => {
      if (typeof m === 'object') {
        return { user_id: m.user_id, user_type: m.user_type };
      }
      return { user_id: m, user_type: 'parent' };
    });

    const result: any = await client.request(CREATE_GROUP_CHAT, {
      name,
      members: membersData
    });

    return result.insert_chats_one;
  }

  static async getChatDetails(chat: any, currentUserId: number) {
    const participantsList = [];
    for (const p of chat.chat_participants) {
      const userInfo = await UserService.getUserInfo(p.user_id, p.user_type);
      if (userInfo) participantsList.push(userInfo);
    }

    const otherUser = participantsList.find((u: any) => u.id !== currentUserId);

    return {
      id: chat.id,
      type: chat.type,
      name: chat.type === 'direct' ? (otherUser?.name || 'Unknown') : chat.name,
      participants: participantsList,
      unread_count: 0
    };
  }

  static async getChats(userId: number) {
    const result: any = await client.request(GET_CHATS, { user_id: userId });

    return result.chats.map((chat: any) => {
      let chatName = chat.name;

      if (chat.type === 'direct') {
        const otherUser = chat.chat_participants.find((p: any) => p.user?.id !== userId)?.user;
        chatName = otherUser?.name || 'Unknown User';
      }

      return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        participants: chat.chat_participants.map((p: any) => p.user),
        last_message: chat.messages[0] ? {
          id: chat.messages[0].id,
          sender_id: chat.messages[0].sender.id,
          sender_name: chat.messages[0].sender.name,
          content: chat.messages[0].content,
          timestamp: chat.messages[0].created_at,
          is_read: false
        } : null,
        unread_count: 0
      };
    });
  }

  static async getMessages(chatId: number) {
    const result: any = await client.request(GET_MESSAGES, { chat_id: chatId });

    return result.messages.map((msg: any) => ({
      id: msg.id,
      sender_id: msg.sender.id,
      sender_name: msg.sender.name,
      content: msg.content,
      timestamp: msg.created_at,
      is_read: false
    }));
  }

  static async sendMessage(chatId: number, senderId: number, content: string) {
    const result: any = await client.request(SEND_MESSAGE, {
      chat_id: chatId,
      sender_id: senderId,
      content
    });

    const message = result.insert_messages_one;

    return {
      id: message.id,
      sender_id: message.sender.id,
      sender_name: message.sender.name,
      content: message.content,
      timestamp: message.created_at,
      is_read: false
    };
  }
}
