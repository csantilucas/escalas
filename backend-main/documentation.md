# 📚 Documentação da API - Sistema de Gestão de Escalas, Plantões e Distribuição Inteligente

Esta documentação detalha todas as rotas disponíveis na API, os métodos HTTP aceitos, requisitos de autenticação/autorização, parâmetros esperados, formato do corpo da requisição (*payload*) e exemplos de resposta de sucesso e erro.

---

## 📑 Sumário

1. [Padrões de Autenticação e Segurança](#1-padrões-de-autenticação-e-segurança)
2. [Autenticação (`/api/auth`)](#2-autenticação-apiauth)
3. [Distribuição Dinâmica de Atendimentos (`/atendimentos`)](#3-distribuição-dinâmica-de-atendimentos-atendimentos)
4. [Gestão de Atendimentos (`/atendimentos`)](#4-gestão-de-atendimentos-atendimentos)
5. [Equipes de Plantão e Filas (`/equipes`)](#5-equipes-de-plantão-e-filas-equipes)
6. [Membros de Equipes (`/equipes/:id/membros`)](#6-membros-de-equipes-equipesidmembros)
7. [Plantonistas (`/plantao`)](#7-plantonistas-plantao)
8. [Escalas e Registros de Plantão (`/register`)](#8-escalas-e-registros-de-plantão-register)
9. [Dashboard e Streaming SSE em Tempo Real (`/dashboard`)](#9-dashboard-e-streaming-sse-em-tempo-real-dashboard)
10. [Tokens de Serviços Externos (`/tokens`)](#10-tokens-de-serviços-externos-tokens)
11. [Usuários (`/users`)](#11-usuários-users)
12. [Variáveis de Ambiente](#12-variáveis-de-ambiente)

---

## 1. Padrões de Autenticação e Segurança

A API utiliza o **Better Auth** com persistência em PostgreSQL. 
Para as rotas protegidas, o cliente pode se autenticar de duas formas:
- **Cookies de Sessão HTTP-Only**: Enviados automaticamente pelos navegadores via `credentials: 'include'`. O cookie padrão é `better-auth.session_token`.
- **Bearer Token**: Enviado via cabeçalho `Authorization: Bearer <session_token>`.

### Níveis de Acesso:
- 🌐 **Pública**: Acesso sem necessidade de autenticação.
- 🔒 **Autenticado**: Qualquer usuário autenticado com sessão válida.
- 👑 **Admin**: Requer usuário autenticado com `typeUser: "admin"`.

---

## 2. Autenticação (`/api/auth`)

Rotas gerenciadas nativamente pelo framework *Better Auth*.

### 2.1. Cadastro de Usuário
- **Método**: `POST`
- **Rota**: `/api/auth/sign-up/email`
- **Acesso**: 🌐 Pública
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "name": "Carlos Silva",
    "email": "carlos@alphasoftware.com.br",
    "password": "senhaForte123",
    "id_atendente": "ATEND-001",
    "typeUser": "atendente"
  }
  ```
- **Resposta de Sucesso (200 OK)**:
  ```json
  {
    "user": {
      "id": "cm...abc",
      "name": "Carlos Silva",
      "email": "carlos@alphasoftware.com.br",
      "id_atendente": "ATEND-001",
      "typeUser": "atendente"
    }
  }
  ```

---

### 2.2. Login de Usuário
- **Método**: `POST`
- **Rota**: `/api/auth/sign-in/email`
- **Acesso**: 🌐 Pública
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "email": "carlos@alphasoftware.com.br",
    "password": "senhaForte123"
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna os dados do usuário e injeta o cookie HTTP-only `better-auth.session_token`.

---

### 2.3. Obter Sessão Ativa
- **Método**: `GET`
- **Rota**: `/api/auth/get-session`
- **Acesso**: 🌐 Pública (valida cookie enviado)
- **Resposta de Sucesso (200 OK)**: Retorna `{ "user": { ... }, "session": { ... } }` ou `null`.

---

### 2.4. Logout (Encerrar Sessão)
- **Método**: `POST`
- **Rota**: `/api/auth/sign-out`
- **Acesso**: 🌐 Pública / Autenticado
- **Resposta de Sucesso (200 OK)**: Invalida a sessão no banco e limpa o cookie no cliente.

---

## 3. Distribuição Dinâmica de Atendimentos (`/atendimentos`)

Módulo que centraliza a inteligência de triagem e distribuição de atendimentos para o WhatsApp (integrado com **n8n** e **Z-PRO**), com **Fallback Sequencial (Round-Robin)** automático.

### 3.1. Distribuir Atendimento Dinâmico
- **Método**: `POST` ou `GET`
- **Rota**: `/atendimentos/distribuir`
- **Acesso**: 🌐 Pública (para consumo pelo n8n)
- **Descrição**:
  1. Identifica a equipe pela fila ou lista de `departamentos` cadastrados.
  2. Valida o expediente/turnos de trabalho de cada analista no fuso horário local de Manaus (`America/Manaus`), considerando as margens de tolerância configuradas.
  3. Consulta o Z-PRO (`/listUsers`) para verificar quem está online.
  4. Consulta a Alpha Software (`/dash/ticketsPerUser`) para calcular a pontuação de carga:
     $$\text{Score} = (\text{abertos} \times 10) + (\text{pendentes} \times 5) + (\text{resolvidosHoje} \times 1)$$
  5. **Fallback Sequencial**: Se as APIs externas estiverem fora do ar, ordena os analistas por `ultimoAtendimentoEm ASC` e `ordemSequencial ASC`, distribuindo via Round-Robin para garantir que a operação nunca pare.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "departamento": "suporte_operacional",
    "fila": "N1-Suporte",
    "ticketId": 17733,
    "clienteId": 1068,
    "numero": "556992162902",
    "pushName": "Santi"
  }
  ```
- **Resposta de Sucesso (200 OK - Modo Ponderado)**:
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
    "modoDistribuicao": "ponderado_menor_carga",
    "pontuacaoCarga": 8,
    "metricas": {
      "abertos": 0,
      "pendentes": 1,
      "fechadosHoje": 3
    }
  }
  ```
- **Resposta de Sucesso (200 OK - Modo Fallback Sequencial)**:
  ```json
  {
    "sucesso": true,
    "status": "open",
    "userId": 5,
    "atendenteNome": "Gabriel",
    "atendenteEmail": "gabriel@alphasoftware.com.br",
    "atendenteSlack": "U09S6HELBNZ",
    "queueId": 6,
    "queueName": "N1-Suporte",
    "equipeNome": "N1 - Suporte",
    "modoDistribuicao": "fallback_sequencial_round_robin",
    "pontuacaoCarga": 0,
    "metricas": {
      "abertos": 0,
      "pendentes": 0,
      "fechadosHoje": 0
    }
  }
  ```

---

### 3.2. Previsão de Próximo Atendente por Fila
- **Método**: `GET`
- **Rota**: `/atendimentos/previsao`
- **Acesso**: 🌐 Pública / Autenticado
- **Descrição**: Retorna a previsão em tempo real de quem é o próximo analista da fila para receber atendimento em cada equipe.
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "equipeId": "cm...eq1",
      "equipeNome": "N1 - Suporte",
      "queueId": 6,
      "queueName": "N1-Suporte",
      "departamentos": ["suporte", "suporte_operacional", "operacional"],
      "totalMembros": 4,
      "proximoDaFila": {
        "id": "cm...mem1",
        "nome": "Gabriel",
        "zproId": 5,
        "email": "gabriel@alphasoftware.com.br",
        "ultimoAtendimentoEm": "2026-08-28T15:30:00.000Z"
      }
    }
  ]
  ```

---

## 4. Gestão de Atendimentos (`/atendimentos`)

### 4.1. Criar Atendimento Inicial (n8n)
- **Método**: `POST`
- **Rota**: `/atendimentos`
- **Acesso**: 🌐 Pública
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "ticket_zpro": 17733,
    "cliente_id": 1068,
    "cnpj": "12.345.678/0001-90",
    "atendente": "Gabriel",
    "protocolo": "PROT-20260828",
    "nome_contato": "João Cliente",
    "tipo_atendimento": "Suporte N1"
  }
  ```
- **Resposta de Sucesso (201 Created)**: Retorna o objeto do atendimento persistido.

---

### 4.2. Atualizar Atendimento com Tomticket (n8n)
- **Método**: `PATCH`
- **Rota**: `/atendimentos/atualizar`
- **Acesso**: 🌐 Pública
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "ticket_zpro": 17733,
    "ticket_tomticket": "TT-98421",
    "status": "Resolvido",
    "tipo_atendimento": "Fiscal",
    "atendente": "Pedro"
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna o atendimento com os dados sincronizados.

---

### 4.3. Listar Atendimentos Paginados com Filtros
- **Método**: `GET`
- **Rota**: `/atendimentos`
- **Acesso**: 🌐 Pública / Autenticado
- **Query Params**:
  - `page`: Número da página (padrão: 1)
  - `limit`: Itens por página (padrão: 10)
  - `cnpj`: Filtro por CNPJ
  - `atendente`: Filtro por nome do analista
  - `busca`: Busca textual ampla
  - `sincronizado`: `true` | `false`
  - `dataInicio`: Filtro por data inicial ISO (`YYYY-MM-DD`)
  - `dataFim`: Filtro por data final ISO (`YYYY-MM-DD`)

---

### 4.4. Métricas Consolidadas de Atendimentos
- **Método**: `GET`
- **Rota**: `/atendimentos/metrics`
- **Acesso**: 🌐 Pública / Autenticado
- **Query Params**: `atendente`, `dataInicio`, `dataFim`
- **Resposta de Sucesso (200 OK)**:
  ```json
  {
    "total": 150,
    "sincronizados": 142,
    "pendentes": 8,
    "taxaSincronizacao": "94.67%",
    "registradosHoje": 25
  }
  ```

---

### 4.5. Buscar Atendimentos por Analista
- **Método**: `GET`
- **Rota**: `/atendimentos/analista/:analista`
- **Acesso**: 🌐 Pública / Autenticado
- **Query Params**: `page`, `limit`, `busca`, `sincronizado`, `dataInicio`, `dataFim`

---

## 5. Equipes de Plantão e Filas (`/equipes`)

Gerenciamento dinâmico de equipes, filas do Z-PRO e roteamento de departamentos.

### 5.1. Listar Equipes
- **Método**: `GET`
- **Rota**: `/equipes`
- **Acesso**: 🔒 Autenticado
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "id": "cm...eq1",
      "nome": "N1 - Suporte",
      "descricao": "Primeiro nível de suporte operacional",
      "cor": "#3B82F6",
      "ativo": true,
      "queueId": 6,
      "queueName": "N1-Suporte",
      "departamentos": ["suporte", "suporte_operacional", "operacional"],
      "isFallback": true,
      "membros": [ ... ]
    }
  ]
  ```

---

### 5.2. Obter Equipe por ID
- **Método**: `GET`
- **Rota**: `/equipes/:id`
- **Acesso**: 🔒 Autenticado

---

### 5.3. Criar Equipe
- **Método**: `POST`
- **Rota**: `/equipes`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "nome": "N2 - Suporte Fiscal",
    "descricao": "Atendimento especializado em rotinas fiscais",
    "cor": "#10B981",
    "ativo": true,
    "queueId": 7,
    "queueName": "N2-Suporte",
    "departamentos": ["suporte_fiscal", "fiscal", "notas"],
    "isFallback": false
  }
  ```
- **Resposta de Sucesso (201 Created)**

---

### 5.4. Atualizar Equipe
- **Método**: `PUT`
- **Rota**: `/equipes/:id`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**: Permite atualizar nome, cor, `queueId`, `queueName`, `departamentos` e `isFallback`.

---

### 5.5. Excluir Equipe
- **Método**: `DELETE`
- **Rota**: `/equipes/:id`
- **Acesso**: 👑 Admin

---

## 6. Membros de Equipes (`/equipes/:id/membros`)

### 6.1. Vincular Membro à Equipe
- **Método**: `POST`
- **Rota**: `/equipes/:id/membros` *(ou `/equipes/vincular`)*
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "userId": "cm...user1",
    "cargo": "analista_n1",
    "ordemSequencial": 1,
    "pesoPrioridade": 0,
    "turnos": [
      { "inicio": "08:10", "fim": "12:20" },
      { "inicio": "14:00", "fim": "18:00" }
    ],
    "margemInicioMinutos": 5,
    "margemFimMinutos": 5,
    "ativo": true
  }
  ```
- **Resposta de Sucesso (201 Created)**

---

### 6.2. Atualizar Membro da Equipe
- **Método**: `PATCH`
- **Rota**: `/equipes/:id/membros/:userId`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**: Permite atualizar `cargo`, `ordemSequencial`, `pesoPrioridade`, `turnos`, margens e `ativo`.

---

### 6.3. Desvincular Membro da Equipe
- **Método**: `DELETE`
- **Rota**: `/equipes/:id/membros/:userId`
- **Acesso**: 👑 Admin

---

## 7. Plantonistas (`/plantao`)

### 7.1. Cadastrar Plantonista
- **Método**: `POST`
- **Rota**: `/plantao`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "userId": "cm...user1"
  }
  ```

---

### 7.2. Listar Plantonistas
- **Método**: `GET`
- **Rota**: `/plantao`
- **Acesso**: 🔒 Autenticado

---

### 7.3. Buscar Plantonista por ID de Usuário
- **Método**: `GET`
- **Rota**: `/plantao/user/:userId`
- **Acesso**: 👑 Admin

---

## 8. Escalas e Registros de Plantão (`/register`)

### 8.1. Obter Plantonista do Momento (Em Tempo Real)
- **Método**: `GET`
- **Rota**: `/register/next`
- **Acesso**: 🌐 Pública
- **Descrição**: Retorna o plantonista ativo no exato momento da chamada com base na hora atual.

---

### 8.2. Listar Escalas Cadastradas
- **Método**: `GET`
- **Rota**: `/register/find`
- **Acesso**: 🔒 Autenticado
- **Query Params**: `page` (padrão: 1)

---

### 8.3. Obter Registro de Escala por ID
- **Método**: `GET`
- **Rota**: `/register/:id`
- **Acesso**: 🔒 Autenticado

---

### 8.4. Criar Registro de Plantão Manual
- **Método**: `POST`
- **Rota**: `/register`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "plantao_id": "cm...plt1",
    "user_id": "cm...user1",
    "data": "2026-09-01T00:00:00.000Z",
    "startTime": "07:00",
    "endTime": "19:00"
  }
  ```

---

### 8.5. Gerar Escala Automática em Lote
- **Método**: `POST`
- **Rota**: `/register/gerar`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "dataInicio": "2026-09-01",
    "diaSemana": 6,
    "horarioInicio": "07:00",
    "horarioFim": "19:00"
  }
  ```

---

### 8.6. Alterar Responsável do Plantão (Troca)
- **Método**: `PATCH`
- **Rota**: `/register/change-user/:id`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "newUserId": "cm...user_novo"
  }
  ```

---

### 8.7. Atualizar Horários ou Ticket de um Registro
- **Método**: `PUT`
- **Rota**: `/register/:id`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "data": "2026-09-01T00:00:00.000Z",
    "startTime": "08:00",
    "endTime": "20:00",
    "ticketZpro": "17733"
  }
  ```

---

### 8.8. Excluir Registro de Plantão
- **Método**: `DELETE`
- **Rota**: `/register/:id`
- **Acesso**: 👑 Admin

---

## 9. Dashboard e Streaming SSE em Tempo Real (`/dashboard`)

### 9.1. Streaming de Eventos SSE (Server-Sent Events)
- **Método**: `GET`
- **Rotas**: `/dashboard/stream` e `/dashboard/events`
- **Acesso**: 🔒 Autenticado
- **Headers de Resposta**: `Content-Type: text/event-stream`, `Cache-Control: no-cache`
- **Descrição**: Mantém conexão aberta para transmissão em tempo real de novos atendimentos, alterações em equipes e distribuições efetuadas.

---

### 9.2. Visão Geral Consolidada
- **Método**: `GET`
- **Rota**: `/dashboard/overview`
- **Acesso**: 🔒 Autenticado
- **Resposta de Sucesso (200 OK)**:
  ```json
  {
    "atendimentos": {
      "total": 1250,
      "hoje": 42,
      "sincronizados": 1180,
      "pendentes": 70,
      "taxaSincronizacao": "94%"
    },
    "equipes": {
      "totalAtivas": 3
    },
    "usuarios": {
      "totalAtendentes": 14
    },
    "proximoPlantao": { ... },
    "sse": {
      "connectedClients": 2
    },
    "timestamp": "2026-08-28T16:00:00.000Z"
  }
  ```

---

### 9.3. Relatório de Chamados da Alpha Software
- **Método**: `GET`
- **Rota**: `/dashboard/tickets`
- **Acesso**: 🔒 Autenticado
- **Query Params**:
  - `startDate`: Data de início (`YYYY-MM-DD`) *(obrigatório)*
  - `endDate`: Data de fim (`YYYY-MM-DD`) *(obrigatório)*

---

### 9.4. Relatório Consolidado do Tomticket
- **Método**: `GET`
- **Rota**: `/dashboard/tomticket`
- **Acesso**: 👑 Admin
- **Query Params**:
  - `startDate`: Data de início (`YYYY-MM-DD`) *(obrigatório)*
  - `endDate`: Data de fim (`YYYY-MM-DD`) *(obrigatório)*
  - `refresh`: `true` para ignorar o cache do banco

---

## 10. Tokens de Serviços Externos (`/tokens`)

Gerenciamento dinâmico de tokens para integrações (`tomticket`, `alpha_dash`, `zpro`).

### 10.1. Listar Tokens Cadastrados
- **Método**: `GET`
- **Rota**: `/tokens`
- **Acesso**: 👑 Admin

---

### 10.2. Buscar Token por Nome do Serviço
- **Método**: `GET`
- **Rota**: `/tokens/service/:serviceName`
- **Acesso**: 👑 Admin
- **Exemplo**: `/tokens/service/zpro` ou `/tokens/service/alpha_dash`

---

### 10.3. Obter Token por ID
- **Método**: `GET`
- **Rota**: `/tokens/:id`
- **Acesso**: 👑 Admin

---

### 10.4. Criar ou Atualizar Token (Upsert)
- **Método**: `POST`
- **Rota**: `/tokens`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "serviceName": "zpro",
    "token": "tok_secret_zpro_12345",
    "description": "Token de autenticação para a API do Z-PRO",
    "isActive": true
  }
  ```

---

### 10.5. Atualizar Token por ID
- **Método**: `PUT`
- **Rota**: `/tokens/:id`
- **Acesso**: 👑 Admin

---

### 10.6. Excluir Token
- **Método**: `DELETE`
- **Rota**: `/tokens/:id`
- **Acesso**: 👑 Admin

---

## 11. Usuários (`/users`)

### 11.1. Cadastrar Usuário
- **Método**: `POST`
- **Rota**: `/users`
- **Acesso**: 👑 Admin
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "name": "Guilherme",
    "email": "guilherme@alphasoftware.com.br",
    "pass": "senha123",
    "id_atendente": "ATEND-GUILHERME",
    "typeUser": "atendente"
  }
  ```
- **Resposta de Sucesso (201 Created)**

---

### 11.2. Listar Usuários
- **Método**: `GET`
- **Rota**: `/users`
- **Acesso**: 🔒 Autenticado
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "id": "cm...usr1",
      "name": "Gabriel"
    },
    {
      "id": "cm...usr2",
      "name": "Guilherme"
    }
  ]
  ```

---

## 12. Variáveis de Ambiente

Todas as 17 variáveis de ambiente padronizadas no arquivo `.env`:

| Categoria | Variável | Descrição |
| :--- | :--- | :--- |
| **Servidor** | `PORT` | Porta do servidor Express (padrão: `5004`) |
| | `HOST` | Host do servidor (padrão: `localhost`) |
| **PostgreSQL** | `POSTGRES_USER` | Usuário do banco de dados |
| | `POSTGRES_PASSWORD` | Senha do banco de dados |
| | `POSTGRES_HOST` | Host do PostgreSQL (ex: `localhost`) |
| | `POSTGRES_PORT` | Porta do PostgreSQL (ex: `5432`) |
| | `POSTGRES_DB` | Nome do banco de dados |
| | `DATABASE_URL` | URL de conexão Prisma |
| **Better Auth** | `BETTER_AUTH_SECRET` | Chave secreta de assinatura de sessão |
| | `BETTER_AUTH_URL` | URL base do Better Auth (ex: `http://localhost:5004`) |
| **JWT** | `JWT_SECRET` | Chave secreta para tokens JWT |
| | `JWT_EXPIRES_IN` | Tempo de expiração do JWT (ex: `1d`) |
| **CORS** | `CORS_ORIGINS` | Origens permitidas separadas por vírgula |
| **Tomticket** | `TOMTICKET_BEARER_TOKEN` | Token de autenticação da API Tomticket |
| **Alpha Software** | `ALPHA_API_TOKEN` | Token de autenticação da API Alpha Dash |
| | `EXTERNAL_API_TOKEN` | Alias/Fallback para o token da Alpha |
| **Z-PRO** | `ZPRO_API_TOKEN` | Token de autenticação da API Z-PRO |
