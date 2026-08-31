# 📚 Documentação da API & Sistema - Escalas, Plantões e Distribuição Inteligente

Documentação técnica completa e atualizada da arquitetura, rotas HTTP, modelos de dados, fluxo de eventos em tempo real (SSE), algoritmos de triagem/distribuição ponderada e integração externa (n8n, Z-PRO, Tomticket, Alpha Software).

---

## 📑 Sumário

1. [Visão Geral & Arquitetura](#1-visão-geral--arquitetura)
2. [Estrutura Oficial de Equipes e Plantonistas](#2-estrutura-oficial-de-equipes-e-plantonistas)
3. [Padrões de Autenticação e Segurança](#3-padrões-de-autenticação-e-segurança)
4. [Autenticação (`/api/auth`)](#4-autenticação-apiauth)
5. [Distribuição Inteligente de Atendimentos (`/atendimentos`)](#5-distribuição-inteligente-de-atendimentos-atendimentos)
6. [Gestão de Atendimentos (`/atendimentos`)](#6-gestão-de-atendimentos-atendimentos)
7. [Equipes de Plantão e Filas Z-PRO (`/equipes`)](#7-equipes-de-plantão-e-filas-z-pro-equipes)
8. [Membros de Equipes e Turnos (`/equipes/:id/membros`)](#8-membros-de-equipes-e-turnos-equipesidmembros)
9. [Plantonistas Oficiais (`/plantao`)](#9-plantonistas-oficiais-plantao)
10. [Escalas e Registros de Plantão (`/register`)](#10-escalas-e-registros-de-plantão-register)
11. [Dashboard & Streaming SSE em Tempo Real (`/dashboard`)](#11-dashboard--streaming-sse-em-tempo-real-dashboard)
12. [Tokens de Serviços Externos (`/tokens`)](#12-tokens-de-serviços-externos-tokens)
13. [Usuários do Sistema (`/users`)](#13-usuários-do-sistema-users)
14. [Tratamento de Datas e Fusos Horários (GMT-4 / UTC)](#14-tratamento-de-datas-e-fusos-horários-gmt-4--utc)
15. [Variáveis de Ambiente](#15-variáveis-de-ambiente)

---

## 1. Visão Geral & Arquitetura

O ecossistema é composto por:
- **Backend (Node.js / Express / TypeScript / Prisma ORM / Better Auth)**: Executa na porta `3001` (ou configurada via `PORT`), gerenciando regras de negócio, balanceamento de carga, conexões SSE e integrações externas.
- **Frontend (Next.js 16 App Router / React 19 / Tailwind CSS / Vanilla CSS)**: Painel operacional administrativo e **Modo TV / Wallboard** de monitoramento dinâmico em tempo real.
- **Banco de Dados (PostgreSQL)**: Persistência relacional de usuários, equipes, membros, escalas, plantonistas, logs de auditoria e tokens.

---

## 2. Estrutura Oficial de Equipes e Plantonistas

### 🏢 2.1. Equipes Operacionais Oficiais

| Equipe | Queue ID (Z-PRO) | Queue Name | Departamentos Vinculados | É Fallback Geral? |
| :--- | :---: | :--- | :--- | :---: |
| **N1 - Suporte** | `6` | `N1-Suporte` | `["suporte", "suporte_operacional", "operacional"]` | ✅ Sim |
| **N2 - Suporte Fiscal** | `7` | `N2-Suporte` | `["suporte_fiscal", "fiscal", "notas"]` | ❌ Não |
| **N3 - Engenharia** | `8` | `N3-Engenharia` | `["n3", "engenharia", "desenvolvimento", "bugs"]` | ❌ Não |
| **Financeiro** | `2` | `Financeiro` | `["financeiro", "cobranca", "boletos"]` | ❌ Não |

### 👨‍💼 2.2. Rotação Oficial de Plantonistas (8 Integrantes)

A rotação cíclica oficial de plantonistas segue rigorosamente a sequência de posições:

1. **Gabriel** (`posicao: 0`)
2. **Geneses** (`posicao: 1`)
3. **Guilherme** (`posicao: 2`)
4. **Gustavo** (`posicao: 3`)
5. **Junior** (`posicao: 4`)
6. **Kariny** (`posicao: 5`)
7. **Pedro** (`posicao: 6`)
8. **Thiago** (`posicao: 7`)

*(Nota: Tainara possui cadastro como usuária/analista, porém está configurada com `isPlantonista: false` fora da rotação de plantão).*

---

## 3. Padrões de Autenticação e Segurança

A API utiliza o **Better Auth** com persistência em PostgreSQL. 
Para rotas protegidas, o cliente pode se autenticar por:
- **Cookies de Sessão HTTP-Only**: Enviados automaticamente pelos navegadores via `credentials: 'include'`. Cookie: `better-auth.session_token`.
- **Bearer Token**: Cabeçalho `Authorization: Bearer <session_token>`.

### Níveis de Acesso:
- 🌐 **Pública**: Rotas de consumo de automações (ex: n8n, webhooks Z-PRO, distribuição).
- 🔒 **Autenticado**: Usuários autenticados no sistema com sessão ativa.
- 👑 **Admin**: Requer usuário com perfil `typeUser: "admin"`.

---

## 4. Autenticação (`/api/auth`)

Rotas nativas do *Better Auth*:

### 4.1. Cadastro de Usuário
- **Método**: `POST`
- **Rota**: `/api/auth/sign-up/email`
- **Acesso**: 🌐 Pública
- **Payload**:
  ```json
  {
    "name": "Carlos Silva",
    "email": "carlos@alphasoftware.com.br",
    "password": "senhaForte123",
    "id_atendente": "ATEND-001",
    "typeUser": "atendente"
  }
  ```

### 4.2. Login de Usuário
- **Método**: `POST`
- **Rota**: `/api/auth/sign-in/email`
- **Acesso**: 🌐 Pública
- **Payload**:
  ```json
  {
    "email": "carlos@alphasoftware.com.br",
    "password": "senhaForte123"
  }
  ```

### 4.3. Obter Sessão Ativa
- **Método**: `GET`
- **Rota**: `/api/auth/get-session`
- **Acesso**: 🌐 Pública (valida cookie enviado)

### 4.4. Logout
- **Método**: `POST`
- **Rota**: `/api/auth/sign-out`
- **Acesso**: 🌐 Pública / Autenticado

---

## 5. Distribuição Inteligente de Atendimentos (`/atendimentos`)

Módulo que centraliza a inteligência de triagem e balanceamento de carga para chamados do WhatsApp e Z-PRO.

### 5.1. Distribuir Atendimento
- **Método**: `POST` ou `GET`
- **Rota**: `/atendimentos/distribuir`
- **Acesso**: 🌐 Pública (consumido pelo n8n e webhooks)
- **Parâmetros Suportados** (via JSON body ou Query Params):
  - `departamento` / `depto` / `area` / `department`: Nome do departamento do chatbot.
  - `fila` / `queue` / `queueName`: Nome da fila de destino.
  - `ticketId` / `ticketID` / `ticket`: ID do ticket gerado no Z-PRO.
  - `clienteId` / `clienteID`: ID do cliente no Z-PRO.
  - `numero` / `Number` / `phone` / `number`: Telefone/WhatsApp do cliente.
  - `pushName`: Nome do contato no WhatsApp.
  - `horarioMinutosOverride`: Minutos do dia para forçar simulação de horário (ex: `600` = 10:00).
  - `ignorarApisExternas`: `true` | `false` (força fallback sequencial para testes).

#### 🧮 Lógica de Balanceamento:
1. **Roteamento de Fila**: Identifica a equipe pelo nome ou alias de departamento cadastrado. Se não encontrar, assume a equipe fallback (**N1** - Queue 6).
2. **Turno e Expediente**: Filtra analistas ativos cujo horário atual esteja dentro de seus turnos de trabalho (com margem de tolerância configurada, padrão $\pm 5$ minutos em GMT-4).
3. **Status Online no Z-PRO**: Consulta `/listUsers` do Z-PRO para verificar quem está online.
4. **Cálculo Ponderado de Carga (Alpha Software)**:
   $$\text{Score} = (\text{abertos} \times 10) + (\text{pendentes} \times 5) + (\text{resolvidosHoje} \times 1)$$
   O analista com menor $\text{Score}$ é selecionado. Em caso de empate, escolhe quem recebeu atendimento há mais tempo.
5. **Fallback Round-Robin**: Se as APIs externas estiverem offline ou nenhum analista estiver logado no Z-PRO, ordena os membros da escala por `ultimoAtendimentoEm ASC` e `ordemSequencial ASC`.
6. **Notificação SSE & Auditoria**: Dispara evento em tempo real via SSE (`dashboard_update`) para o painel de Logs e Wallboard TV, além de atualizar o timestamp de `ultimoAtendimentoEm` no banco.

#### Exemplo de Requisição (JSON):
```json
{
  "departamento": "suporte_operacional",
  "fila": "N1-Suporte",
  "ticketId": 18055,
  "clienteId": 1089,
  "numero": "556999999999",
  "pushName": "Empresa Alfa"
}
```

#### Exemplo de Resposta (200 OK - Modo Ponderado):
```json
{
  "sucesso": true,
  "status": "open",
  "userId": 10,
  "atendenteNome": "Guilherme",
  "atendenteEmail": "guilherme@alphasoftware.com.br",
  "atendenteSlack": "U09S869N1P0",
  "queueId": 6,
  "queueName": "N1-Suporte",
  "equipeNome": "N1 - Suporte",
  "modoDistribuicao": "algoritmo_ponderado",
  "pontuacaoCarga": 8,
  "metricas": {
    "abertos": 0,
    "pendentes": 1,
    "fechadosHoje": 3
  }
}
```

---

### 5.2. Previsão de Próximo Atendente por Fila
- **Método**: `GET`
- **Rota**: `/atendimentos/previsao`
- **Acesso**: 🌐 Pública / Autenticado
- **Descrição**: Retorna o cálculo em tempo real de quem é o próximo analista projetado para receber o próximo chamado em cada equipe/fila.

---

## 6. Gestão de Atendimentos (`/atendimentos`)

### 6.1. Criar Atendimento (Webhook n8n)
- **Método**: `POST`
- **Rota**: `/atendimentos`
- **Acesso**: 🌐 Pública
- **Payload**:
  ```json
  {
    "ticket_zpro": 18055,
    "cliente_id": 1089,
    "cnpj": "12.345.678/0001-90",
    "atendente": "Gabriel",
    "protocolo": "PROT-20260831",
    "nome_contato": "João Silva",
    "tipo_atendimento": "N1"
  }
  ```

### 6.2. Atualizar Atendimento com Dados do Tomticket
- **Método**: `PATCH`
- **Rota**: `/atendimentos/atualizar`
- **Acesso**: 🌐 Pública
- **Payload**:
  ```json
  {
    "ticket_zpro": 18055,
    "ticket_tomticket": "TT-99882",
    "tipo_atendimento": "Suporte Fiscal",
    "atendente": "Pedro"
  }
  ```

### 6.3. Listar Atendimentos Paginados
- **Método**: `GET`
- **Rota**: `/atendimentos`
- **Query Params**: `page`, `limit`, `cnpj`, `atendente`, `busca`, `sincronizado`, `dataInicio`, `dataFim`.

### 6.4. Métricas Consolidadas
- **Método**: `GET`
- **Rota**: `/atendimentos/metrics`
- **Query Params**: `atendente`, `dataInicio`, `dataFim`.

---

## 7. Equipes de Plantão e Filas Z-PRO (`/equipes`)

- `GET /equipes`: Lista todas as equipes com seus membros, turnos e filas vinculadas.
- `GET /equipes/:id`: Detalhes de uma equipe específica.
- `POST /equipes`: Cria nova equipe *(Admin)*.
- `PUT /equipes/:id`: Atualiza dados, cores, `queueId` e departamentos *(Admin)*.
- `DELETE /equipes/:id`: Exclui equipe *(Admin)*.

---

## 8. Membros de Equipes e Turnos (`/equipes/:id/membros`)

- `POST /equipes/:id/membros`: Vincula analista à equipe com seus turnos e ordem.
  ```json
  {
    "userId": "usr_cuid_123",
    "cargo": "analista_n1",
    "ordemSequencial": 1,
    "pesoPrioridade": 0,
    "turnos": [
      { "inicio": "08:00", "fim": "12:00" },
      { "inicio": "14:00", "fim": "18:00" }
    ],
    "margemInicioMinutos": 5,
    "margemFimMinutos": 5,
    "ativo": true
  }
  ```
- `PATCH /equipes/:id/membros/:userId`: Atualiza cargo, turnos ou margens *(Admin)*.
- `DELETE /equipes/:id/membros/:userId`: Remove analista da equipe *(Admin)*.

---

## 9. Plantonistas Oficiais (`/plantao`)

- `POST /plantao`: Cadastra analista na tabela de plantonistas *(Admin)*.
- `GET /plantao`: Lista todos os plantonistas ordenados por `posicao ASC`.
- `GET /plantao/user/:userId`: Consulta dados do plantonista por ID de usuário.

---

## 10. Escalas e Registros de Plantão (`/register`)

### 10.1. Próximo Plantonista Ativo
- **Método**: `GET`
- **Rota**: `/register/next`
- **Acesso**: 🌐 Pública
- **Resolução Inteligente**:
  1. Identifica se há plantão em andamento agora (`startTime <= agora <= endTime`).
  2. Busca a escala programada para hoje ou próximos dias (`data >= inicioHoje`).
  3. Se não houver escalas futuras cadastradas, retorna o plantonista ativo da rotação oficial com base na sequência de posições.

### 10.2. Demais Rotas de Escalas
- `GET /register/find?page=1`: Listagem paginada de escalas.
- `POST /register`: Criação manual de plantão *(Admin)*.
- `POST /register/gerar`: Geração automática em lote para finais de semana ou feriados *(Admin)*.
- `PATCH /register/change-user/:id`: Troca de responsável pelo plantão *(Admin)*.
- `PUT /register/:id`: Atualização de data/horário de plantão *(Admin)*.
- `DELETE /register/:id`: Exclusão de registro *(Admin)*.

---

## 11. Dashboard & Streaming SSE em Tempo Real (`/dashboard`)

### 11.1. Conexão SSE (Server-Sent Events)
- **Método**: `GET`
- **Rotas**: `/dashboard/stream` ou `/dashboard/events`
- **Headers**: `Content-Type: text/event-stream`, `Cache-Control: no-cache`
- **Eventos Emitidos**:
  - `connected`: Boas-vindas ao estabelecer conexão.
  - `ping`: Heartbeat periódico a cada 25 segundos para manter canais abertos.
  - `dashboard_update`: Evento emitido a cada distribuição, alteração em equipes, atendimentos ou escalas.

#### Estrutura do Payload SSE:
```json
{
  "entity": "distribuicao",
  "action": "create",
  "data": {
    "sucesso": true,
    "status": "open",
    "userId": 5,
    "atendenteNome": "Gabriel",
    "atendenteEmail": "gabriel@alphasoftware.com.br",
    "queueId": 6,
    "queueName": "N1-Suporte",
    "equipeNome": "N1 - Suporte",
    "modoDistribuicao": "algoritmo_ponderado",
    "ticketId": 18055
  },
  "timestamp": "2026-08-31T14:35:00.000Z"
}
```

---

## 12. Tokens de Serviços Externos (`/tokens`)

- `GET /tokens`: Lista tokens configurados (`zpro`, `tomticket`, `alpha_dash`).
- `GET /tokens/service/:serviceName`: Busca token ativo pelo identificador do serviço.
- `POST /tokens`: Upsert (cria ou atualiza) token de integração *(Admin)*.
- `DELETE /tokens/:id`: Remove token cadastrado *(Admin)*.

---

## 13. Usuários do Sistema (`/users`)

- `POST /users`: Cria usuário e vincula perfil *(Admin)*.
- `GET /users`: Lista analistas e administradores cadastrados.

---

## 14. Tratamento de Datas e Fusos Horários (GMT-4 / UTC)

Para evitar que datas do banco (`YYYY-MM-DDT00:00:00.000Z`) recuem 1 dia quando processadas em fusos horários brasileiros (GMT-4 / Cuiabá / Manaus / Brasília):
- O front-end utiliza o módulo centralizado [`lib/dateUtils.ts`](file:///c:/Users/TERMINAL/Desktop/escalas/front-end/lib/dateUtils.ts).
- Funções disponíveis:
  - `formatarData(val)`: Formata `DD/MM/AAAA` sem regressão de dia.
  - `formatarDiaSemana(val)`: Retorna o dia da semana em português (`Seg`, `Segunda-feira`).
  - `formatarHora(val)`: Formata horários `HH:mm`.
  - `formatarDataHora(val)` & `formatarHoraLocal(val)`: Converte timestamps UTC em data/hora local.
  - `obterHojeStr()`: Retorna `YYYY-MM-DD` atual no fuso local.

---

## 15. Variáveis de Ambiente

Configurações no arquivo `.env` do backend:

| Categoria | Variável | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| **Servidor** | `PORT` | Porta HTTP do Express | `3001` |
| | `HOST` | Host do servidor | `0.0.0.0` |
| **PostgreSQL** | `DATABASE_URL` | URL de conexão Prisma | `postgresql://postgres:pass@localhost:5432/escalas` |
| **Better Auth** | `BETTER_AUTH_SECRET` | Chave secreta de sessão | `secret_super_forte_123` |
| | `BETTER_AUTH_URL` | URL base do Better Auth | `http://localhost:3001` |
| **JWT** | `JWT_SECRET` | Assinatura de tokens JWT | `jwt_secret_key_123` |
| | `JWT_EXPIRES_IN` | Expiração do JWT | `1d` |
| **CORS** | `CORS_ORIGINS` | Origens permitidas | `http://localhost:3000,http://192.168.1.27:3000` |
| **Tomticket** | `TOMTICKET_BEARER_TOKEN` | Token da API Tomticket | `bearer_secret_tomticket` |
| **Alpha Software** | `ALPHA_API_TOKEN` | Token da API Alpha Dash | `token_alpha_dash` |
| **Z-PRO** | `ZPRO_API_TOKEN` | Token da API Z-PRO | `token_zpro_chat` |
