// lib/env.ts
/**
 * Resolução dinâmica e centralizada das URLs de Backend e Frontend.
 * Suporta acesso transparente por 'localhost', '127.0.0.1' ou qualquer IP de rede local (ex: 192.168.x.x).
 */

export function getApiBaseUrl(): string {
  // 1. Extrai porta configurada no .env ou default
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const envBackendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || process.env.BACKEND_PORT;
  const envServerIp = process.env.NEXT_PUBLIC_SERVER_IP || process.env.SERVER_IP;

  let port = envBackendPort || "5005";
  if (envUrl) {
    try {
      const parsed = new URL(envUrl);
      if (parsed.port) port = parsed.port;
    } catch {}
  }

  // 2. Se executando no navegador do cliente, adota dinamicamente o IP/Host da barra de endereços
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}:${port}`;
  }

  // 3. Se SSR no servidor Node/Next
  if (envUrl) return envUrl;
  if (envServerIp) return `http://${envServerIp}:${port}`;
  return `http://localhost:${port}`;
}

export const env = {
  get NEXT_PUBLIC_API_URL() {
    return getApiBaseUrl();
  },
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5004",
} as const;

export default env;
