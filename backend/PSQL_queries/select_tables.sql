SELECT schemaname, tablename 
FROM pg_catalog.pg_tables
where schemaname = 'public';