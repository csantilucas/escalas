#!/bin/sh
set -e

echo "Aguardando banco e sincronizando schema..."
npx prisma db push --accept-data-loss || true

# Execução condicional do seed via variável de ambiente RUN_SEED (true/false)
if [ "$RUN_SEED" = "true" ] || [ "$RUN_SEED" = "TRUE" ] || [ "$RUN_SEED" = "1" ]; then
  echo "🌱 Executando Seed inicial do banco de dados (RUN_SEED=true)..."
  npx tsx ./src/seed/seed.ts || true
else
  echo "ℹ️ Seed ignorado (RUN_SEED=false). Para popular o banco ao subir, defina RUN_SEED=true no .env."
fi

echo "Iniciando backend..."
exec "$@"
