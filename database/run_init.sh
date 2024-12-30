#!/bin/bash



export PGPASSWORD=$DB_PASSWORD

# Run the SQL file using psql
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f /tmp/init_script.sql
