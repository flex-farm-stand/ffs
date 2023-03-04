# NOTE
#  - the credentials are the defaults from self-hosted Supabase via Docker
#  - dbname, host, port, username values need to changed to real credentials

# Create dump
pg_dump --dbname="postgres" --host=localhost --port=5432 --username=postgres  --table='"auth"."users"' > ./db/dump.sql

# Wipe db
psql --dbname="postgres" --host=localhost --port=5432 --username=postgres  --table='"auth"."users"' -f ./db/create_db.sql

# Restore dump
psql --dbname="postgres" --host=localhost --port=5432 --username=postgres  --table='"auth"."users"' -f ./db/dump.sql
