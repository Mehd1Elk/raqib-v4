-- Discussions de cohorte
CREATE TABLE IF NOT EXISTS cohort_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','closed','archived')),
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  closed_at TIMESTAMPTZ
);

-- Messages dans les discussions
CREATE TABLE IF NOT EXISTS cohort_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES cohort_discussions(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'response' CHECK (message_type IN ('system','response','escalation','alert','auto')),
  reply_to UUID REFERENCES cohort_messages(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Communications directes agent-à-agent
CREATE TABLE IF NOT EXISTS agent_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_agent TEXT NOT NULL,
  to_agent TEXT NOT NULL,
  content TEXT NOT NULL,
  comm_type TEXT DEFAULT 'message' CHECK (comm_type IN ('message','escalation','handoff','validation','rejection')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Conversations 1-on-1 avec le fondateur
CREATE TABLE IF NOT EXISTS agent_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_cohort_msg_discussion ON cohort_messages(discussion_id);
CREATE INDEX idx_cohort_msg_agent ON cohort_messages(agent_id);
CREATE INDEX idx_agent_comm_from ON agent_communications(from_agent);
CREATE INDEX idx_agent_comm_to ON agent_communications(to_agent);
CREATE INDEX idx_agent_chat_agent ON agent_chats(agent_id);

-- RLS
ALTER TABLE cohort_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_all_cohort_discussions" ON cohort_discussions FOR SELECT USING (true);
CREATE POLICY "insert_all_cohort_discussions" ON cohort_discussions FOR INSERT WITH CHECK (true);
CREATE POLICY "update_all_cohort_discussions" ON cohort_discussions FOR UPDATE USING (true);
CREATE POLICY "read_all_cohort_messages" ON cohort_messages FOR SELECT USING (true);
CREATE POLICY "insert_all_cohort_messages" ON cohort_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "read_all_agent_communications" ON agent_communications FOR SELECT USING (true);
CREATE POLICY "insert_all_agent_communications" ON agent_communications FOR INSERT WITH CHECK (true);
CREATE POLICY "read_all_agent_chats" ON agent_chats FOR SELECT USING (true);
CREATE POLICY "insert_all_agent_chats" ON agent_chats FOR INSERT WITH CHECK (true);

-- Fonction pour incrementer le compteur de messages
CREATE OR REPLACE FUNCTION increment_message_count() RETURNS TRIGGER AS $$
BEGIN
  UPDATE cohort_discussions SET message_count = message_count + 1 WHERE id = NEW.discussion_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_cohort_message_insert
  AFTER INSERT ON cohort_messages
  FOR EACH ROW EXECUTE FUNCTION increment_message_count();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE cohort_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE agent_communications;
