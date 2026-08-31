FROM node:24-bookworm-slim AS base
WORKDIR /app
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./
COPY index.ts ./
COPY src ./src
COPY generated ./generated

# Variáveis necessárias durante o build para o prisma generate validar sem erro
ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=112658 \
    POSTGRES_HOST=localhost \
    POSTGRES_PORT=5432 \
    POSTGRES_DB=backend \
    PORT=3001 \
    HOST=0.0.0.0 \
    BETTER_AUTH_SECRET=build_secret_temp_for_prisma_generate_123 \
    JWT_SECRET_ACCESS_TOKEN=build_secret_temp_for_prisma_generate_123

RUN npx prisma generate

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
  && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "start"]
