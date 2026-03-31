-- ============================================================
-- Tables: decisions, stream_events, captured_thoughts, focus_sessions
-- ============================================================

-- File de décisions
CREATE TABLE IF NOT EXISTS decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  context TEXT,
  urgency TEXT DEFAULT 'medium' CHECK (urgency IN ('critical','high','medium','low')),
  entity TEXT,
  options JSONB NOT NULL DEFAULT '[]',
  chosen_option TEXT,
  decided_at TIMESTAMPTZ,
  source TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Stream events (cross-entités)
CREATE TABLE IF NOT EXISTS stream_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity TEXT NOT NULL,
  entity_color TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('data','agent','decision','alert','conquest','deploy')),
  title TEXT NOT NULL,
  detail TEXT,
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('critical','normal','low')),
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pensées capturées (Stream de Conscience)
CREATE TABLE IF NOT EXISTS captured_thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  routed_to_agent TEXT,
  routed_to_layer TEXT,
  routed_to_entity TEXT,
  status TEXT DEFAULT 'captured' CHECK (status IN ('captured','routed','executed','dismissed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Focus mode sessions
CREATE TABLE IF NOT EXISTS focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode_id TEXT NOT NULL,
  mode_label TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  decisions_taken INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_stream_entity ON stream_events(entity);
CREATE INDEX idx_stream_type ON stream_events(event_type);
CREATE INDEX idx_stream_created ON stream_events(created_at DESC);
CREATE INDEX idx_decisions_urgency ON decisions(urgency);
CREATE INDEX idx_thoughts_status ON captured_thoughts(status);

-- RLS
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE captured_thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_all_decisions" ON decisions FOR SELECT USING (true);
CREATE POLICY "write_all_decisions" ON decisions FOR INSERT WITH CHECK (true);
CREATE POLICY "update_all_decisions" ON decisions FOR UPDATE USING (true);
CREATE POLICY "read_all_stream" ON stream_events FOR SELECT USING (true);
CREATE POLICY "write_all_stream" ON stream_events FOR INSERT WITH CHECK (true);
CREATE POLICY "read_all_thoughts" ON captured_thoughts FOR SELECT USING (true);
CREATE POLICY "write_all_thoughts" ON captured_thoughts FOR INSERT WITH CHECK (true);
CREATE POLICY "update_all_thoughts" ON captured_thoughts FOR UPDATE USING (true);
CREATE POLICY "read_all_focus" ON focus_sessions FOR SELECT USING (true);
CREATE POLICY "write_all_focus" ON focus_sessions FOR INSERT WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE stream_events;
ALTER PUBLICATION supabase_realtime ADD TABLE decisions;
