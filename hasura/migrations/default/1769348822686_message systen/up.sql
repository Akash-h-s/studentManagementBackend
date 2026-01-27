-- Chat System Database Schema

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('direct', 'group')),
    name VARCHAR(255), -- NULL for direct chats, required for groups
    created_by INT REFERENCES teachers(id) ON DELETE SET NULL, -- Who created the group
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create chat_participants table (many-to-many between chats and users)
CREATE TABLE IF NOT EXISTS chat_participants (
    id SERIAL PRIMARY KEY,
    chat_id INT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('teacher', 'parent')),
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(chat_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INT NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_id INT NOT NULL,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('teacher', 'parent')),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_participants_user ON chat_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_chat ON chat_participants(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chats_updated_at ON chats(updated_at DESC);

-- Add trigger to update chats.updated_at when a message is sent
CREATE OR REPLACE FUNCTION update_chat_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chats SET updated_at = NOW() WHERE id = NEW.chat_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chat_timestamp
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_timestamp();

-- Sample data for testing (optional)
-- Insert a test group chat
-- INSERT INTO chats (type, name, created_by) VALUES ('group', 'Class 10-A Parents', 1);

-- Add participants (teacher id 1 and parent ids 1, 2, 3)
-- INSERT INTO chat_participants (chat_id, user_id, user_type) VALUES 
--     (1, 1, 'teacher'),
--     (1, 1, 'parent'),
--     (1, 2, 'parent'),
--     (1, 3, 'parent');