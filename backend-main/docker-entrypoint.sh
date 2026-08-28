#!/bin/sh
set -e

echo "Aguardando banco e aplicando migrations..."
npx prisma migrate deploy

if [ "$RUN_SEED" = "true" ]; then
  echo "Rodando seed (RUN_SEED=true)..."
  npx prisma db seed
else
  echo "Seed ignorado (defina RUN_SEED=true para executar)."
fi

echo "Iniciando backend..."
exec "$@"
