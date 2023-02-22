# NOTE
#  - the credentials are the defaults from self-hosted Supabase via Docker
#  - dbname, host, port, username values need to changed to real credentials

# Create dump
pg_dump --dbname="postgres" --host=localhost --port=5432 --username=postgres  --table='"auth"."users"' > ./dump.sql

# Restore dump
psql --dbname="postgres" --host=localhost --port=5432 --username=postgres  --table='"auth"."users"' -f ./dump.sql
