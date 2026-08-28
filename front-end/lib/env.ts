// lib/env.ts
/**
 * Resolução dinâmica e centralizada das URLs de Backend e Frontend.
 * Suporta acesso transparente por 'localhost', '127.0.0.1' ou qualquer IP de rede local (ex: 192.168.x.x).
 */

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // Extrai a porta configurada no .env (ou default 3001)
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    let port = "3001";
    if (envUrl) {
      try {
        const parsed = new URL(envUrl);
        if (parsed.port) port = parsed.port;
      } catch {}
    }

    // Se estiver em localhost ou 127.0.0.1 ou IP de rede, monta a URL correspondente
    return `${protocol}//${hostname}:${port}`;
  }

  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}

export const env = {
  get NEXT_PUBLIC_API_URL() {
    return getApiBaseUrl();
  },
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

export default env;
