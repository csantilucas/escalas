# backend

Este diretório contém o backend do projeto.

## Requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- Variáveis de ambiente configuradas para o banco

## Instalação

1. Abra o terminal na pasta `backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto ou configure as variáveis de ambiente necessárias:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
```

O projeto usa `prisma.config.ts` para montar a URL de conexão com o PostgreSQL.

## Executando o backend

Por enquanto, o servidor é iniciado direto com TypeScript:

```bash
npx tsx index.ts
```

O servidor escuta na porta `3000`.

## Prisma

Se você fizer alguma alteração no esquema do Prisma, rode o comando abaixo para aplicar a migração e atualizar o cliente:

```bash
npx prisma migrate dev --name nome-aqui
```


## Observações

- A configuração atual usa `express`, `mongoose`, `pg`, `reflect-metadata`, `prisma` e `@prisma/client`.
- O bootstrap do servidor carrega a conexão com o PostgreSQL em `src/config/server.ts`.
- Se quiser, adicione um script `start` no `package.json` para facilitar a execução.
