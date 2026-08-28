// src/app/usuarios/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserTable } from "@/components/ui/UserTable";
import { Plus, ShieldAlert, X, Sparkles, UserCheck, Shield } from "lucide-react";
import { userService, UserItem } from "@/services";

export default function UsuariosPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para exibição e processamento do card
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("comum"); // "admin" | "comum"
  const [typeUser, setTypeUser] = useState("atendente"); // "atendente" | "comum"
  const [idAtendente, setIdAtendente] = useState("");
  const [isPlantonista, setIsPlantonista] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const isAdmin = user?.typeUser === "admin" || (user as any)?.role === "admin";

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

    if (typeUser === "atendente" && !idAtendente) {
      setFormError("O ID do Atendente (Z-PRO) é obrigatório para usuários do tipo Atendente.");
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.register({
        name,
        email: email.toLowerCase().trim(),
        pass,
        role,
        typeUser,
        id_atendente: typeUser === "atendente" && idAtendente ? idAtendente.trim() : undefined,
        isPlantonista: typeUser === "atendente" ? isPlantonista : false,
        posicao: typeUser === "atendente" && isPlantonista ? Number(posicao) : 0,
      });

      // Limpa formulário e recarrega dados
      setName("");
      setEmail("");
      setPass("");
      setRole("comum");
      setTypeUser("atendente");
      setIdAtendente("");
      setIsPlantonista(false);
      setPosicao(0);
      setShowCreateCard(false);
      carregarUsuarios();
    } catch (error: any) {
      setFormError(error.message || "Erro ao cadastrar usuário.");
    } finally {
      setIsSubmitting(false);
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 max-w-7xl mx-auto">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">Gestão de Usuários & Atendentes</h1>
            <p className="text-xs text-zinc-400">
              Controle o nível de acesso (Admin ou Comum) e o tipo de usuário (Atendente com Z-PRO/Plantão ou Usuário Comum).
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowCreateCard(!showCreateCard)}
          variant={showCreateCard ? "outline" : "primary"}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer"
        >
          {showCreateCard ? <X size={14} /> : <Plus size={14} />}
          <span>{showCreateCard ? "Cancelar" : "Novo Usuário"}</span>
        </Button>
      </div>

      {/* Card Novo Usuário */}
      {showCreateCard && (
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-in slide-in-from-top-2 duration-200 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Cadastrar Novo Usuário</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Um Administrador pode ser também um Atendente (com ID Z-PRO e plantão) ou apenas um usuário comum.
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4">
            {/* Linha 1: Dados de Acesso */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Nome *"
                placeholder="Ex: Lucas Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="E-mail *"
                type="email"
                placeholder="nome@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Senha de Acesso *"
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Linha 2: Nível de Acesso (Admin / Comum) e Tipo de Usuário (Atendente / Comum) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-zinc-300">1. Nível de Acesso (Permissões) *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-blue-500 h-9"
                >
                  <option value="comum">Usuário Comum (Acesso Padrão)</option>
                  <option value="admin">Administrador (Acesso Total / Gestão)</option>
                </select>
                <p className="text-[11px] text-zinc-500">Define o que o usuário pode gerenciar no painel.</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-zinc-300">2. Tipo de Usuário (Função) *</label>
                <select
                  value={typeUser}
                  onChange={(e) => setTypeUser(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-blue-500 h-9"
                >
                  <option value="atendente">Atendente (Atua no Z-PRO e/ou Plantão)</option>
                  <option value="comum">Usuário Comum (Não é Atendente / Sem Z-PRO)</option>
                </select>
                <p className="text-[11px] text-zinc-500">Define se o usuário recebe atendimentos e participa de plantão.</p>
              </div>
            </div>

            {/* Linha 3: Campos Condicionais Exclusivos de Atendente */}
            {typeUser === "atendente" ? (
              <div className="p-4 bg-zinc-950/60 border border-blue-500/20 rounded-xl space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-cyan-300">Dados do Atendente (Z-PRO & Plantão)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <Input
                    label="ID do Atendente no Z-PRO *"
                    placeholder="Ex: 20"
                    value={idAtendente}
                    onChange={(e) => setIdAtendente(e.target.value)}
                    disabled={isSubmitting}
                  />

                  <div className="flex items-center h-9 px-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-200">
                      <input
                        type="checkbox"
                        checked={isPlantonista}
                        onChange={(e) => setIsPlantonista(e.target.checked)}
                        disabled={isSubmitting}
                        className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
                      />
                      <span>Participa da Escala de Plantão?</span>
                    </label>
                  </div>
                </div>

                {isPlantonista && (
                  <div className="pt-2 border-t border-zinc-800/60 max-w-xs animate-in fade-in duration-200">
                    <label className="block text-[11px] text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Ordem / Posição na Escala Automática (0, 1, 2...):
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={posicao}
                      onChange={(e) => setPosicao(Number(e.target.value))}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs font-mono focus:outline-none focus:border-emerald-500 h-9"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl text-xs text-zinc-500 italic">
                Usuário cadastrado como <strong>Comum</strong>: Não necessita de ID do Z-PRO e não participa de escalas de plantão.
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateCard(false)}
                className="px-4 text-xs"
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting} className="px-5 text-xs">
                Salvar Usuário
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Renderização da Tabela Isolada */}
      <UserTable usuarios={usuarios} isLoading={loading} />
    </div>
  );
}