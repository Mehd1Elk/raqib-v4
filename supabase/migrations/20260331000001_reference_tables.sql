-- 001: Extensions + Reference Tables
-- Raqib V4 — 1000 layers, 10 entities, 9 platforms

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════ PLATFORMS ═══════
CREATE TABLE platforms (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT
);

INSERT INTO platforms (code, name, color, description) VALUES
  ('CC', 'Claude Code', '#D97706', 'Code complexe, Rust, scraping, APIs, datasets'),
  ('CW', 'Cowork', '#7C3AED', 'Documents, analyses, fiches, rapports'),
  ('OC', 'OpenClaw', '#059669', 'Orchestration, cron, scheduling, notifications'),
  ('CX', 'Codex (OpenAI)', '#2563EB', 'Code parallele, multi-fichier, CI/CD'),
  ('PP', 'Perplexity', '#0891B2', 'Recherche verifiee, sources premium'),
  ('AG', 'Antigravity (Google)', '#DC2626', 'Frontend, UX, build-test loop'),
  ('ML', 'Mistral (Le Chat)', '#F97316', 'Verification FR/EU, NLP francais'),
  ('DS', 'DeepSeek / Qwen', '#6366F1', 'Verification adversariale, open source, local'),
  ('CA', 'Claude.ai Projects', '#8B5CF6', 'Memoire persistante, contexte agent, cognitif');

-- ═══════ ENTITIES ═══════
CREATE TABLE entities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('BRIQUE', 'VENTURE', 'HOLDING', 'ECOSYSTEM'))
);

INSERT INTO entities (id, name, color, description, type) VALUES
  ('noos', 'NOOS', '#3D5E8C', 'Algorithmic Psychiatric Assessment Engine', 'BRIQUE'),
  ('aelya', 'AELYA', '#3D7C5E', 'Consent & Anonymization Agent', 'BRIQUE'),
  ('myne', 'MYNE', '#7B5EA7', 'Sovereign Data Marketplace', 'BRIQUE'),
  ('burhan', 'BURHAN', '#B8963E', 'Blockchain Audit Trail', 'BRIQUE'),
  ('yrknown', 'YrKnown', '#B87D3E', 'Tacit Knowledge Digitization', 'BRIQUE'),
  ('diwane', 'DIWANE', '#6E2A3D', 'Art Sovereignty & Credit Lombard', 'VENTURE'),
  ('alguesov', 'AlgueSov', '#3D7C8C', 'Seaweed Traceability Web 4.0', 'VENTURE'),
  ('amana', 'AMANA', '#5E6E3D', 'Charitable Trust Infrastructure', 'VENTURE'),
  ('cg', 'CG SA', '#162B20', 'Investment Club Pan-Africain · Corridor Atlantique · 22 Nations · CFC', 'HOLDING'),
  ('cercle', 'Cercle du Gazoduc', '#C9A96E', 'Ecosysteme Souverain · Eigen Holding · 6 Subsidiaires · Conquete 2026', 'ECOSYSTEM');

-- ═══════ CATEGORIES ═══════
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  position INT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE(entity_id, position)
);
