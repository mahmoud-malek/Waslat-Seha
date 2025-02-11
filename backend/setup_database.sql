-- Step 1: Create a new database if it doesn't exist
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'waslat_seha') THEN
      CREATE DATABASE waslat_seha;
   END IF;
END
$$;

-- Step 2: Create a new user with a password if it doesn't exist
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'mahmoud') THEN
      CREATE USER mahmoud WITH ENCRYPTED PASSWORD 'seekers';
   END IF;
END
$$;

-- Step 3: Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE waslat_seha TO mahmoud;

-- Step 4: Set default settings for the user
ALTER ROLE mahmoud SET client_encoding TO 'utf8';
ALTER ROLE mahmoud SET default_transaction_isolation TO 'read committed';
ALTER ROLE mahmoud SET timezone TO 'UTC';

-- Step 5: Connect to the database
\c waslat_seha;

-- Step 6: Create a schema if it doesn't exist (optional, useful for organizing tables)
DO
$$
BEGIN
   IF NOT EXISTS (SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'my_schema') THEN
      CREATE SCHEMA my_schema AUTHORIZATION mahmoud;
   END IF;
END
$$;

-- Step 7: Grant schema usage to the user
GRANT USAGE, CREATE ON SCHEMA my_schema TO mahmoud;

-- Step 8: Grant privileges on all future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO mahmoud;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema 
GRANT USAGE, SELECT ON SEQUENCES TO mahmoud;