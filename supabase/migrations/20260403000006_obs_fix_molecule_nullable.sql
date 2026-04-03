ALTER TABLE obs_patients_aggregate ALTER COLUMN molecule DROP NOT NULL;
NOTIFY pgrst, 'reload schema';
