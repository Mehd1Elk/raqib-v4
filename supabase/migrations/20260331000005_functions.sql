-- 005: Database functions

-- Search layers by trigram + ILIKE
CREATE OR REPLACE FUNCTION search_layers(
  p_query TEXT,
  p_limit INT DEFAULT 20
)
RETURNS TABLE(
  id TEXT,
  name TEXT,
  entity_id TEXT,
  entity_name TEXT,
  platform_code TEXT,
  actual_rows INT,
  target_rows INT,
  status TEXT,
  similarity REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.name,
    l.entity_id,
    e.name AS entity_name,
    l.platform_code,
    l.actual_rows,
    l.target_rows,
    l.status,
    similarity(l.name, p_query) AS similarity
  FROM layers l
  JOIN entities e ON e.id = l.entity_id
  WHERE l.name ILIKE '%' || p_query || '%'
     OR similarity(l.name, p_query) > 0.1
  ORDER BY similarity(l.name, p_query) DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- Entity stats aggregation
CREATE OR REPLACE FUNCTION entity_stats(p_entity_id TEXT DEFAULT NULL)
RETURNS TABLE(
  entity_id TEXT,
  entity_name TEXT,
  entity_type TEXT,
  total_layers BIGINT,
  populated_layers BIGINT,
  empty_layers BIGINT,
  total_entries BIGINT,
  total_target_rows BIGINT,
  avg_freshness REAL,
  avg_quality REAL,
  completion_pct REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id AS entity_id,
    e.name AS entity_name,
    e.type AS entity_type,
    COUNT(l.id) AS total_layers,
    COUNT(l.id) FILTER (WHERE l.actual_rows > 0) AS populated_layers,
    COUNT(l.id) FILTER (WHERE l.actual_rows = 0) AS empty_layers,
    COALESCE(SUM(l.actual_rows), 0)::BIGINT AS total_entries,
    COALESCE(SUM(l.target_rows), 0)::BIGINT AS total_target_rows,
    COALESCE(AVG(l.freshness_score), 0)::REAL AS avg_freshness,
    COALESCE(AVG(l.quality_score), 0)::REAL AS avg_quality,
    CASE
      WHEN COUNT(l.id) > 0 THEN ROUND((COUNT(l.id) FILTER (WHERE l.actual_rows > 0)::REAL / COUNT(l.id) * 100)::NUMERIC, 2)::REAL
      ELSE 0
    END AS completion_pct
  FROM entities e
  LEFT JOIN layers l ON l.entity_id = e.id
  WHERE (p_entity_id IS NULL OR e.id = p_entity_id)
  GROUP BY e.id, e.name, e.type
  ORDER BY e.id;
END;
$$ LANGUAGE plpgsql STABLE;

-- Daily snapshot: compute and insert scores for each entity
CREATE OR REPLACE FUNCTION daily_snapshot()
RETURNS VOID AS $$
BEGIN
  INSERT INTO scores (entity_id, date, total_layers, populated_layers, total_entries, avg_freshness, avg_quality)
  SELECT
    e.id,
    CURRENT_DATE,
    COUNT(l.id)::INT,
    COUNT(l.id) FILTER (WHERE l.actual_rows > 0)::INT,
    COALESCE(SUM(l.actual_rows), 0)::INT,
    COALESCE(AVG(l.freshness_score), 0)::REAL,
    COALESCE(AVG(l.quality_score), 0)::REAL
  FROM entities e
  LEFT JOIN layers l ON l.entity_id = e.id
  GROUP BY e.id
  ON CONFLICT (entity_id, date)
  DO UPDATE SET
    total_layers = EXCLUDED.total_layers,
    populated_layers = EXCLUDED.populated_layers,
    total_entries = EXCLUDED.total_entries,
    avg_freshness = EXCLUDED.avg_freshness,
    avg_quality = EXCLUDED.avg_quality;
END;
$$ LANGUAGE plpgsql;
