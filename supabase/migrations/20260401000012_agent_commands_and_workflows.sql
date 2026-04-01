-- SQL0: Agent Commands & Workflows Tables
-- Purpose: Enable agent command orchestration and multi-step workflow management
-- Tables: agent_commands (reverse channel for commands), workflows (chain definitions)
-- RLS: Enabled with anon INSERT/SELECT/UPDATE policies
-- Realtime: Enabled for agent_commands (bridge polls for pending commands)
-- Created: 2026-04-01

-- ============================================================================
-- TABLE 1: agent_commands
-- ============================================================================
-- Reverse channel: frontend sends commands to agents via this table
-- Bridge service polls for status='pending', sends to agent, updates status
-- Workflow: pending → sent → ack → completed/failed

CREATE TABLE IF NOT EXISTS agent_commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  command TEXT NOT NULL CHECK (command IN ('run', 'pause', 'resume', 'stop', 'deploy_workflow')),
  payload JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'ack', 'completed', 'failed')),
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Index for bridge polling: get all pending commands
CREATE INDEX idx_agent_commands_pending ON agent_commands (status, created_at)
  WHERE status = 'pending';

-- Index for frontend: look up specific command by ID
CREATE INDEX idx_agent_commands_id ON agent_commands (id);

-- Index for history: commands per agent, most recent first
CREATE INDEX idx_agent_commands_agent ON agent_commands (agent_id, created_at DESC);

-- Enable Realtime: bridge subscribes to INSERT events with status='pending'
ALTER PUBLICATION supabase_realtime ADD TABLE agent_commands;

-- ============================================================================
-- RLS Policies for agent_commands
-- ============================================================================

ALTER TABLE agent_commands ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (backend/bridge)
CREATE POLICY "Allow all for service role" ON agent_commands
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Anon (frontend) can INSERT new commands
CREATE POLICY "Anon can insert commands" ON agent_commands
  FOR INSERT TO anon
  WITH CHECK (true);

-- Anon (frontend) can SELECT commands (to check status)
CREATE POLICY "Anon can read commands" ON agent_commands
  FOR SELECT TO anon
  USING (true);

-- Anon (frontend) can UPDATE status/result (should be service role only in V2)
CREATE POLICY "Anon can update command status" ON agent_commands
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- TABLE 2: workflows
-- ============================================================================
-- Chain definitions: multi-step agent orchestrations
-- Status progression: draft → deployed → paused/archived

CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  entity TEXT,
  steps JSONB NOT NULL DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'deployed', 'paused', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deployed_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  run_count INT DEFAULT 0
);

-- Index for Chain Editor: list workflows by entity and status
CREATE INDEX idx_workflows_entity ON workflows (entity, status);

-- ============================================================================
-- RLS Policies for workflows
-- ============================================================================

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (backend/API)
CREATE POLICY "Allow all for service role" ON workflows
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Anon (frontend) can SELECT workflows (read chain definitions)
CREATE POLICY "Anon can read workflows" ON workflows
  FOR SELECT TO anon
  USING (true);

-- Anon (frontend) can INSERT workflows (create new chains)
CREATE POLICY "Anon can insert workflows" ON workflows
  FOR INSERT TO anon
  WITH CHECK (true);

-- Anon (frontend) can UPDATE workflows (edit chain definitions)
CREATE POLICY "Anon can update workflows" ON workflows
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
