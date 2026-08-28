import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

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

      // Suporte para token de sessão via query string em clientes SSE/EventSource
      const queryToken = req.query.token || req.query.session_token || req.query.access_token;
      if (queryToken && !headers.get("cookie")) {
        headers.set("cookie", `better-auth.session_token=${queryToken}`);
      }

      // Validação de sessão 100% nativa por Cookie via Better Auth
      const session = await auth.api.getSession({
        headers,
      });

      if (!session || !session.user) {
        return res.status(401).json({ error: "Access denied - Invalid or expired session cookie" });
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