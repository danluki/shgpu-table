#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE shgpu_table;
    GRANT ALL PRIVILEGES ON DATABASE shgpu_table TO docker;
    CREATE DATABASE shgpu_table_admin;
    GRANT ALL PRIVILEGES ON DATABASE shgpu_table_admin TO docker;
EOSQL