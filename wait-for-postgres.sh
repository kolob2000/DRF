#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift

until PGPASSWORD="kolob1234" psql -h "$host" -d "todo" -U "kolob" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"