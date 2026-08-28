import { EventEmitter } from "node:events";
import type { Request, Response } from "express";

export type DashboardEntity =
  | "atendimento"
  | "equipe"
  | "membro_equipe"
  | "registro"
  | "plantonista"
  | "token"
  | "distribuicao"
  | "dashboard";

export type DashboardAction =
  | "create"
  | "update"
  | "delete"
  | "sync"
  | "bulk_create";

export interface DashboardEventPayload {
  entity: DashboardEntity;
  action: DashboardAction;
  data?: any;
  timestamp: string;
}

class DashboardEventBus extends EventEmitter {
  private clients: Set<Response> = new Set();
  private pingInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.setMaxListeners(100);
    this.initHeartbeat();
  }

  private initHeartbeat() {
    // Envia um ping a cada 25 segundos para manter a conexão aberta e evitar timeout de proxies (Nginx, Traefik, etc)
    this.pingInterval = setInterval(() => {
      this.broadcast("ping", { time: new Date().toISOString() });
    }, 25000);
  }

  // Registra um cliente conectado ao SSE
  addClient(req: Request, res: Response) {
    // Configura headers do SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no", // Evita buffering no Nginx
      "Access-Control-Allow-Origin": req.headers.origin || "*",
      "Access-Control-Allow-Credentials": "true",
    });

    res.flushHeaders?.();

    // Mensagem inicial de boas-vindas
    const initMessage = {
      message: "Conexão SSE estabelecida com sucesso.",
      connectedAt: new Date().toISOString(),
    };
    res.write(`event: connected\ndata: ${JSON.stringify(initMessage)}\n\n`);

    this.clients.add(res);

    // Quando o cliente desconectar, remove do Set
    req.on("close", () => {
      this.clients.delete(res);
      res.end();
    });
  }

  // Emite evento para todos os clientes conectados
  notify(entity: DashboardEntity, action: DashboardAction, data?: any) {
    const payload: DashboardEventPayload = {
      entity,
      action,
      data,
      timestamp: new Date().toISOString(),
    };

    this.broadcast("dashboard_update", payload);
  }

  private broadcast(eventName: string, data: any) {
    const message = `event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of this.clients) {
      try {
        client.write(message);
      } catch (err) {
        this.clients.delete(client);
      }
    }
  }

  getConnectedCount(): number {
    return this.clients.size;
  }
}

export const sseEventBus = new DashboardEventBus();
