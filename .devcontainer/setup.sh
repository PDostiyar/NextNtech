#!/usr/bin/env bash
# One-time setup for a new Codespace / dev container.
set -euo pipefail

npm install
[ -f .env ] || cp .env.example .env

# Wait for PostgreSQL to accept connections (it starts alongside this container).
for i in $(seq 1 30); do
  if npx prisma migrate deploy; then break; fi
  echo "Waiting for the database… ($i)"; sleep 2
done

npx prisma db seed
echo "✅ Ready — the site starts with 'npm run dev' on port 3000."
