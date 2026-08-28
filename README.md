# 📅 Alpha Escalas

Sistema completo para **gestão de escalas, plantonistas, atendimentos e integração de chamados (TomTicket)**.

---

## 📌 Visão Geral

O **Alpha Escalas** foi desenvolvido para centralizar e otimizar o fluxo operacional de equipes de suporte e atendimento. A plataforma permite organizar turnos e plantões, acompanhar atendimentos em tempo real, gerenciar permissões de usuários e integrar métricas com relatórios exportáveis em PDF e Excel.

---

## 🚀 Tecnologias Utilizadas

### 🌐 Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes & Ícones:** [Lucide React](https://lucide.dev/)
- **Gráficos & Visualização:** [Chart.js](https://www.chartjs.org/) / `react-chartjs-2`
- **Exportação de Dados:** `jspdf`, `jspdf-autotable`, `xlsx`

### ⚙️ Backend
- **Runtime & Framework:** [Node.js](https://nodejs.org/) com [Express 5](https://expressjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) executado via [tsx](https://github.com/privatenumber/tsx)
- **ORM & Banco de Dados:** [Prisma ORM](https://www.prisma.io/) com [PostgreSQL 16](https://www.postgresql.org/)
- **Autenticação & Segurança:** JWT (`jsonwebtoken`), hash com `bcryptjs`, CORS e RBAC (Role-Based Access Control)
- **Testes:** [Vitest](https://vitest.dev/) e [Supertest](https://github.com/ladjs/supertest)

### 🐳 Infraestrutura
- **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## 📁 Estrutura do Repositório

```text
alpha-escalas/
├── backend-main/            # Aplicação Backend (Node.js/Express + Prisma)
│   ├── prisma/              # Schemas e migrações do banco de dados PostgreSQL
│   ├── rotas/               # Documentação detalhada dos endpoints da API
│   ├── src/                 # Código-fonte (Controllers, Services, Middlewares, Seed)
│   ├── index.ts             # Ponto de entrada do servidor backend
│   └── Dockerfile           # Imagem Docker do backend
│
├── front-end/               # Aplicação Frontend (Next.js + Tailwind CSS)
│   ├── app/                 # Estrutura de rotas do Next.js (App Router)
│   │   ├── (painel)/        # Rotas autenticadas (Dashboard, Plantonistas, Atendimentos, etc.)
│   │   └── login/           # Tela de autenticação
│   ├── components/          # Componentes visuais reutilizáveis
│   ├── contexts/            # Context API (Autenticação e estado global)
│   ├── services/            # Clientes HTTP (Axios) e integração com APIs
│   └── Dockerfile           # Imagem Docker do frontend
│
├── docker-compose.yml       # Orquestração dos containers (DB, Backend, Frontend)
├── .env.example             # Exemplo de variáveis de ambiente globais
└── README.md                # Descrição e documentação principal do projeto
```

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação & Controle de Acesso:** Sistema de login com tokens JWT e controle por nível de permissão (`admin` vs `atendente`).
- 👥 **Gestão de Usuários:** Cadastro, listagem e controle de operadores e atendentes.
- 📆 **Escala & Plantões:** Agendamento, vínculo de plantonistas e controle de horários de turno.
- 📊 **Dashboard Operacional:** Visão analítica em tempo real de atendimentos, métricas por período e gráficos de desempenho.
- 🎧 **Gestão de Atendimentos:** Registro, histórico e categorização de chamados.
- 🎫 **Integração TomTicket:** Sincronização e visualização de chamados vinculados à plataforma TomTicket.
- 📄 **Exportação de Relatórios:** Geração instantânea de relatórios em formatos **PDF** e planilhas **Excel (.xlsx)**.

---

## 🛠️ Como Executar o Projeto

### 1. Utilizando Docker Compose (Recomendado)

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd "alpha escalas"
   ```

2. **Configure o arquivo `.env`:**
   Copie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. **Inicie os containers:**
   ```bash
   docker-compose up -d --build
   ```

4. **Acesse as aplicações:**
   - **Frontend:** [http://localhost:5004](http://localhost:5004)
   - **Backend API:** [http://localhost:5005](http://localhost:5005)
   - **PostgreSQL:** `localhost:5433`

---

### 2. Executando Localmente (Sem Docker)

#### Pré-requisitos
- Node.js (v18+)
- PostgreSQL rodando localmente

#### Passo a Passo:

1. **Configurar o Backend:**
   ```bash
   cd backend-main
   npm install
   
   # Configurar o banco de dados via Prisma
   npx prisma migrate dev
   npx prisma db seed # (Opcional: popular banco com dados iniciais)
   
   # Iniciar em modo de desenvolvimento
   npm run dev
   ```

2. **Configurar o Frontend:**
   ```bash
   cd ../front-end
   npm install
   
   # Iniciar o servidor Next.js
   npm run dev
   ```

---

## 🔑 Variáveis de Ambiente Principais

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `POSTGRES_USER` | Usuário do banco de dados | `postgres` |
| `POSTGRES_PASSWORD` | Senha do banco de dados | `postgres` |
| `POSTGRES_DB` | Nome da base de dados | `alpha_escalas` |
| `DATABASE_URL` | URL de conexão Prisma | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET_ACCESS_TOKEN` | Chave secreta para assinatura dos tokens JWT | `sua_chave_secreta` |
| `JWT_ACCESS_TOKEN_EXPIRATION` | Tempo de expiração do token | `15d` |
| `NEXT_PUBLIC_API_URL` | Endpoint base da API consumido pelo frontend | `http://localhost:5005` |
| `CORS_ORIGINS` | Origens permitidas para requisições CORS | `http://localhost:5004` |

---

## 📚 Documentação da API

Para detalhes completos de todas as rotas, payloads de envio, permissões e exemplos de resposta, consulte:
- [`backend-main/rotas/geral.md`](backend-main/rotas/geral.md)

---

## 📄 Licença

Este projeto é de uso interno/proprietário da Alpha Software.
