import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ybwmmmvwhpnotxdysded.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlid21tbXZ3aHBub3R4ZHlzZGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MjQ4MDUsImV4cCI6MjA5MDUwMDgwNX0.2X_U05gQohB9yOZis-cSLA5E4nCWhvMayweD0tXcvls';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const data = JSON.parse(fs.readFileSync('entries-batch.json', 'utf8'));

async function insertData() {
    let successCount = 0;
    
    // Process in batches
    for(let i = 0; i < data.length; i+=50) {
        const batch = data.slice(i, i+50);
        const { error, data: result } = await supabase.from('entries').insert(batch);
        
        if (error) {
            console.error('Error inserting batch:', error.message);
            // If we get an RLS error, we know anon access is blocked
            process.exit(1);
        } else {
            successCount += batch.length;
        }
    }
    console.log(`Successfully inserted ${successCount} entries using via Supabase API.`);
}

insertData();
