#!/usr/bin/env bash
# NOTE
#  - the credentials are the defaults from self-hosted Supabase via Docker
#  - dbname, host, port, username values need to changed to real credentials

# Step-0 - Store db connection details
export PGHOST=localhost
export PGPASSWORD=your-super-secret-and-long-postgres-password
export PGPORT=5423

# Step-1 - (optional) Wipe db - already included in `create_db.sql` script
psql --dbname="postgres" --host=$PGHOST --port=$PGHOST --username=postgres -f ./db/wipe_db.sql

# Step-2 - Create db
psql --dbname="postgres" --host=$PGHOST --port=$PGHOST --username=postgres -f ./db/create_db.sql

# Step-3 - Seed db
psql --dbname="postgres" --host=$PGHOST --port=$PGHOST --username=postgres -f ./db/seed_db.sql
