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
      <div className="w-full max-w-[360px] bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
        
        {/* Identidade Sóbria */}
        <div className="text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              α
            </div>
            <h1 className="text-base font-bold text-zinc-100 tracking-tight">
              Alpha Escalas
            </h1>
          </div>
          <p className="text-zinc-500 text-xs mt-1 font-medium">
            Painel operacional de plantões e roteamento
          </p>
        </div>

        {/* Notificação de erro compacta */}
        {error && (
          <div className="p-2.5 bg-red-950/30 border border-red-900/40 text-red-400 text-xs rounded-md font-medium">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <Input
            id="email"
            label="E-mail corporativo"
            type="email"
            placeholder="nome@alphasoftware.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Senha de acesso"
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            disabled={isLoading}
          />

          <Button 
            type="submit" 
            className="w-full mt-1 h-[36px] text-xs font-semibold" 
            isLoading={isLoading}
          >
            Acessar painel
          </Button>
        </form>

        {/* Rodapé de Ajuda Neutro */}
        <div className="text-center pt-2 border-t border-zinc-800/80">
          <p className="text-[11px] font-medium text-zinc-500">
            Acesso restrito à equipe autorizada.
          </p>
        </div>

      </div>
    </main>
  );
}