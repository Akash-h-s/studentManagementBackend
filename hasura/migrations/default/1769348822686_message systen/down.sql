-- DROP/DOWN SQL for Chat System
-- Run this to completely remove the chat system from your database

-- Drop triggers first
DROP TRIGGER IF EXISTS trigger_update_chat_timestamp ON messages;

-- Drop functions
DROP FUNCTION IF EXISTS update_chat_timestamp();
DROP FUNCTION IF EXISTS get_chat_participant_user(chat_participants);
DROP FUNCTION IF EXISTS get_message_sender(messages);

-- Drop view
DROP VIEW IF EXISTS users;

-- Drop indexes (will be automatically dropped with tables, but included for completeness)
DROP INDEX IF EXISTS idx_chat_participants_user;
DROP INDEX IF EXISTS idx_chat_participants_chat;
DROP INDEX IF EXISTS idx_messages_chat;
DROP INDEX IF EXISTS idx_messages_created_at;
DROP INDEX IF EXISTS idx_chats_updated_at;

-- Drop tables in correct order (child tables first due to foreign keys)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chat_participants CASCADE;
DROP TABLE IF EXISTS chats CASCADE;

-- Verify cleanup
-- Run this to check if tables were removed:
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE '%chat%' OR tablename = 'messages';