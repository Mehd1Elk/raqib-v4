-- Seed: stream_events
INSERT INTO stream_events (entity, entity_color, event_type, title, detail, urgency) VALUES
('NOOS', '#B8963E', 'data', 'noos-collector → n01', '+12 entries psychiatres par département', 'normal'),
('ÆLYA', '#7B5EA7', 'data', 'aelya-collector → a01', '+8 entries lois protection données', 'normal'),
('BURHAN', '#B87D3E', 'agent', 'L1-14 Solidity', 'Smart contract ERC-1155 déployé en testnet', 'normal'),
('EIGEN', '#D4B662', 'deploy', 'Vercel production', '1129 pages · 0 erreurs · commit bdeaf32', 'normal'),
('CG SA', '#162B20', 'conquest', 'GITEX Africa', 'J-7 — 38 cibles restantes à profiler', 'critical'),
('MYNε', '#3D7C5E', 'data', 'myne-collector → m21', '+5 entries Data Act UE', 'normal'),
('NOOS', '#B8963E', 'alert', 'Kappa module anxiété', '0.68 — sous le seuil 0.75', 'critical'),
('EIGEN', '#D4B662', 'agent', 'Anti-duplication', '0 duplication inter-entités · 16384 scannées', 'normal'),
('YrKnown', '#918977', 'data', 'yrknown-collector → y21', '+3 entries patrimoine UNESCO', 'normal'),
('AMANA', '#5E6E3D', 'decision', 'LOI Holmarcom', 'En attente de validation fondateur', 'critical');

-- Seed: decisions
INSERT INTO decisions (question, context, urgency, entity, options, source) VALUES
('Incorporation CFC bloquée — approuver le changement de statuts SA ?', 'Délai réel 16-24 semaines. L''oncle attend confirmation.', 'critical', 'CG SA', '[{"label":"Approuver","action":"approve_cfc"},{"label":"Reporter","action":"defer"},{"label":"Déléguer à Thomas","action":"delegate_thomas"}]', 'kanban'),
('Kappa module anxiété à 0.68 — reporter le Go/No-Go M6 ?', 'Le seuil est 0.75. 153 items restent à calibrer. Le Pr. Bayle peut intervenir.', 'critical', 'NOOS', '[{"label":"Reporter M6+2","action":"defer_m6"},{"label":"Maintenir et intensifier","action":"keep_m6"},{"label":"Escalade Pr. Bayle","action":"escalate_bayle"}]', 'agent-L2-01'),
('Agent L1-14 BURHAN Solidity en erreur 4h — relancer ou réassigner ?', 'Le smart contract compile mais le deploy timeout sur Polygon testnet.', 'high', 'BURHAN', '[{"label":"Relancer","action":"restart_l1_14"},{"label":"Réassigner à Codex","action":"reassign_codex"}]', 'agent-L2-03'),
('Prioriser GITEX ou ATS London pour les 2 prochaines semaines ?', 'GITEX dans 7 jours, 38 cibles à profiler. Londres dans 45 jours.', 'high', 'CG SA', '[{"label":"100% GITEX","action":"focus_gitex"},{"label":"70/30 GITEX/Londres","action":"split_70_30"},{"label":"Parallèle","action":"parallel"}]', 'board-strategie'),
('Recruter un CTO NOOS maintenant ou attendre le seed ?', 'Runway 31 mois. Budget agents 600-810€/mois. Un CTO coûterait 8-12K€/mois.', 'medium', 'NOOS', '[{"label":"Recruter maintenant","action":"hire_now"},{"label":"Attendre seed","action":"wait_seed"},{"label":"CTO part-time advisory","action":"advisory"}]', 'board-finance');
