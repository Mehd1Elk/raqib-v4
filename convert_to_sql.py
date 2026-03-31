import json
import os

json_file = "/Users/mehdielkadiri/eigen-repos/raqib-v4/entries-batch.json"
sql_file = "/Users/mehdielkadiri/eigen-repos/raqib-v4/supabase/migrations/20260331999999_seed_entries.sql"

try:
    with open(json_file, 'r', encoding='utf-8') as f:
        entries = json.load(f)
except FileNotFoundError:
    print("No JSON file found.")
    exit(1)

sql_statements = []

for entry in entries:
    layer_id = entry.get('layer_id', '').replace("'", "''")
    data = json.dumps(entry.get('data', {}), ensure_ascii=False).replace("'", "''")
    source = entry.get('source', '').replace("'", "''")
    confidence = entry.get('confidence', 1.0)
    created_by = entry.get('created_by', 'antigravity-collector').replace("'", "''")
    
    sql = f"INSERT INTO entries (layer_id, data, source, confidence, created_by) VALUES ('{layer_id}', '{data}'::jsonb, '{source}', {confidence}, '{created_by}');"
    sql_statements.append(sql)

with open(sql_file, 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_statements) + "\n")

print(f"Generated {len(sql_statements)} SQL INSERT statements in {sql_file}")
