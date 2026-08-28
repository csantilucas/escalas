// src/app/usuarios/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserTable } from "@/components/ui/UserTable";
import { Plus, ShieldAlert, X } from "lucide-react";
import { userService } from "@/services";

interface Usuario {
  id: string;
  name: string;
  email: string;
  typeUser: string;
  id_atendente?: string;
}

export default function UsuariosPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para exibição e processamento do card
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [idAtendente, setIdAtendente] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const isAdmin = user?.typeUser === "admin";

  async function carregarUsuarios() {
    try {
      setLoading(true);
      const data = await userService.listAll();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) {
      carregarUsuarios();
    }
  }, [isAdmin]);

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !pass) {
      setFormError("Nome, e-mail e senha são obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.register({
        name,
        email: email.toLowerCase().trim(),
        pass,
        id_atendente: idAtendente || undefined,
      });

      // Limpa formulário e recarrega dados
      setName("");
      setEmail("");
      setPass("");
      setIdAtendente("");
      setShowCreateCard(false);
      carregarUsuarios();
    } catch (error: any) {
      setFormError(error.message || "Erro ao cadastrar usuário.");
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center select-none animate-in fade-in duration-300">
        <div className="p-3 bg-red-950/10 border border-red-900/20 text-red-400 rounded-xl">
          <ShieldAlert size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-bold text-zinc-200">Acesso Restrito</h1>
          <p className="text-xs text-zinc-500 max-w-xs">
            Esta área é exclusiva para administradores do sistema Alpha Escalas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-bold text-zinc-100 font-sans">Usuários</h1>
          <p className="text-xs text-zinc-500">
            Gerencie as credenciais e níveis de acesso do sistema
          </p>
        </div>

        <Button
          onClick={() => setShowCreateCard(!showCreateCard)}
          variant={showCreateCard ? "outline" : "primary"}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs"
        >
          {showCreateCard ? <X size={13} /> : <Plus size={13} />}
          <span>{showCreateCard ? "Cancelar" : "Novo Usuário"}</span>
        </Button>
      </div>

      {/* Card Novo Usuário */}
      {showCreateCard && (
        <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Registrar Usuário</h2>
              <p className="text-[11px] text-zinc-500">Insira as informações de acesso básicas do novo membro</p>
            </div>

            {formError && (
              <div className="p-2 bg-red-950/20 border border-red-900/30 text-red-400 text-[11px] rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <Input
                label="Nome"
                placeholder="Ex: Lucas"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="nome@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="ID Atendente (Opcional)"
                placeholder="Ex: 12"
                value={idAtendente}
                onChange={(e) => setIdAtendente(e.target.value)}
                disabled={isSubmitting}
              />

              <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
                <Button type="submit" isLoading={isSubmitting} className="px-5">
                  Salvar Registro
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Renderização da Tabela Isolada */}
      <UserTable usuarios={usuarios} isLoading={loading} />

    </div>
  );
}