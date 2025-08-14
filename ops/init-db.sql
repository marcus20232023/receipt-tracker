-- Initialize the database with necessary extensions and settings
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Set timezone
ALTER DATABASE receipt_tracker SET timezone TO 'UTC';

-- Create a schema for application tables
CREATE SCHEMA IF NOT EXISTS app;

-- Grant permissions to the application user
GRANT USAGE ON SCHEMA app TO receipt_user;
GRANT CREATE ON SCHEMA app TO receipt_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA app TO receipt_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA app TO receipt_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT ALL ON TABLES TO receipt_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT ALL ON SEQUENCES TO receipt_user;
