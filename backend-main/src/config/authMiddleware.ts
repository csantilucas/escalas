import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";
import prisma from "./postgres.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      session?: any;
    }
  }
}

export class AuthMiddleware {
  constructor() {
    this.auth = this.auth.bind(this);
    this.authAdmin = this.authAdmin.bind(this);
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const headers = fromNodeHeaders(req.headers);

      // 1. Extração do token de múltiplas fontes (Authorization Bearer, Cookie, Query)
      let token: string | undefined;

      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }

      if (!token && req.headers.cookie) {
        const match = req.headers.cookie.match(/(?:better-auth\.session_token|token)=([^;]+)/);
        if (match) token = decodeURIComponent(match[1].trim());
      }

      const queryToken = req.query.token || req.query.session_token || req.query.access_token;
      if (!token && typeof queryToken === "string") {
        token = queryToken;
      }

      // Se temos o token, garantimos que o header cookie do Better Auth o receba
      if (token && !headers.get("cookie")) {
        headers.set("cookie", `better-auth.session_token=${token}`);
      }

      // 2. Tenta validação nativa do Better Auth
      let session = await auth.api.getSession({ headers }).catch(() => null);

      // 3. Fallback robusto via Prisma Session (garante 100% de compatibilidade cross-origin)
      if ((!session || !session.user) && token) {
        const dbSession = await prisma.session.findFirst({
          where: {
            token,
            expiresAt: { gt: new Date() },
          },
          include: {
            user: true,
          },
        });

        if (dbSession && dbSession.user) {
          session = {
            session: dbSession,
            user: dbSession.user,
          } as any;
        }
      }

      if (!session || !session.user) {
        return res.status(401).json({ error: "Access denied - Invalid or expired session" });
      }

      req.user = session.user;
      req.session = session.session;
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Access denied - Authentication error" });
    }
  }

  async authAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user && (req.user.typeUser === "admin" || req.user.role === "admin")) {
      return next();
    }

    return res.status(401).json({ error: "Access denied - Not admin" });
  }
}