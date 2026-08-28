// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "../lib/api"; 


interface User {
  id: string;
  name: string;
  email: string;
  typeUser: string;
}

interface SignInCredentials {
  email: string;
  pass: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Recupera os dados do usuário salvos no cookie ao iniciar a aplicação
    const savedUser = Cookies.get("user");
    const token = Cookies.get("token");

    if (savedUser && token) {
      try {
        
        setUser(JSON.parse(decodeURIComponent(savedUser)));
      } catch (error) {
        signOut();
      }
    }
    setLoading(false);
  }, []);

  async function signIn({ email, pass }: SignInCredentials) {
    try {
      // Faz a chamada para a rota de login que mapeamos [/auth/login]
      const response = await api.post("/auth/login", { email, pass }); //
      
      const { accessToken, user: userData } = response.data; //

      // 1. Salva o Token e os dados do Usuário nos Cookies
      // 'expires: 7' mantém o usuário logado por 7 dias
      Cookies.set("token", accessToken, { expires: 7, path: "/" });
      Cookies.set("user", encodeURIComponent(JSON.stringify(userData)), { expires: 7, path: "/" });

      // 2. Atualiza o estado
      setUser(userData);

      // 3. Redireciona para a Dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Falha ao realizar o login.";
      throw new Error(errorMessage);
    }
  }

  function signOut() {
    // Remove os cookies
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });

    // Reseta o estado
    setUser(null);

    // Manda de volta para o login
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nos componentes e páginas
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}