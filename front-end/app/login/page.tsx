// src/app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !pass) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      await signIn({ email, pass });
    } catch (err: any) {
      setError(err.message || "Credenciais incorretas.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 select-none font-sans antialiased">
      {/* 🟢 CONTAINER PRINCIPAL: Fundo cinza suave (bg-zinc-900/40) e bordas finas */}
      <div className="w-full max-w-[360px] bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl">
        
        {/* Identidade Minimalista */}
        <div className="text-left">
          {/* Logo um pouco maior e mais limpa */}
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
            Alpha.
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5 font-medium">
            Acesse o painel de escalas
          </p>
        </div>

        {/* Notificação de erro compacta */}
        {error && (
          <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        {/* Formulário integrado com os novos tamanhos e comportamentos */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="E-mail"
            type="email"
            placeholder="nome@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            disabled={isLoading}
          />

          <Button 
            type="submit" 
            className="w-full mt-1.5 h-[36px] text-xs font-semibold" 
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </form>

        {/* Rodapé de Ajuda Neutro */}
        <div className="text-center pt-1 border-t border-zinc-800/60">
          <p className="text-[11px] font-medium text-zinc-500 hover:text-zinc-400 transition-colors cursor-pointer">
            Esqueceu seus dados? Contate o suporte.
          </p>
        </div>

      </div>
    </main>
  );
}