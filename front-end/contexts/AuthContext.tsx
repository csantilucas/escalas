// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "../lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "comum" | string;
  typeUser?: "atendente" | "comum" | string;
  id_atendente?: string | null;
  zproId?: number | null;
  slackId?: string | null;
  isPlantonista?: boolean;
  posicao?: number;
}

export interface SignInCredentials {
  email: string;
  pass?: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    try {
      // 1. Tenta validar a sessão ativa diretamente no Better Auth (/api/auth/get-session)
      const response = await api.get("/api/auth/get-session");
      if (response.data && response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        Cookies.set("user", encodeURIComponent(JSON.stringify(userData)), { expires: 7, path: "/" });
        if (response.data.session?.token) {
          Cookies.set("better-auth.session_token", response.data.session.token, { expires: 7, path: "/" });
        }
        return;
      }
    } catch {
      // Fallback para usuário salvo em cookie se offline momentâneo
      const savedUser = Cookies.get("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(decodeURIComponent(savedUser)));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    refreshSession().finally(() => setLoading(false));
  }, []);

  async function signIn({ email, pass, password }: SignInCredentials) {
    try {
      const senha = password || pass || "";
      if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
      }

      // Chamada nativa ao endpoint do Better Auth
      const response = await api.post("/api/auth/sign-in/email", {
        email,
        password: senha,
      });

      const userData = response.data?.user;
      const sessionToken = response.data?.session?.token || response.data?.token;

      if (sessionToken) {
        Cookies.set("better-auth.session_token", sessionToken, { expires: 7, path: "/" });
        Cookies.set("token", sessionToken, { expires: 7, path: "/" });
      }

      if (userData) {
        Cookies.set("user", encodeURIComponent(JSON.stringify(userData)), { expires: 7, path: "/" });
        setUser(userData);
      }

      window.location.href = "/dashboard";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Falha ao realizar login. Verifique suas credenciais.";
      throw new Error(errorMessage);
    }
  }

  async function signOut() {
    try {
      await api.post("/api/auth/sign-out", {});
    } catch {
      // Continua logout local mesmo com erro de rede
    } finally {
      Cookies.remove("better-auth.session_token", { path: "/" });
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
      setUser(null);
      router.push("/login");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}