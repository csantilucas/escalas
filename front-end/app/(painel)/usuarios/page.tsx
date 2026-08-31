// src/app/usuarios/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserTable } from "@/components/ui/UserTable";
import { Plus, ShieldAlert, X, Sparkles, UserCheck, Shield, Edit2, AlertCircle, CheckCircle2 } from "lucide-react";
import { userService, UserItem } from "@/services";

export default function UsuariosPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Estados para Criação
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("comum"); // "admin" | "gestor" | "comum"
  const [typeUser, setTypeUser] = useState("atendente"); // "atendente" | "comum"
  const [idAtendente, setIdAtendente] = useState("");
  const [isPlantonista, setIsPlantonista] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para Edição
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPass, setEditPass] = useState("");
  const [editRole, setEditRole] = useState("comum");
  const [editTypeUser, setEditTypeUser] = useState("atendente");
  const [editIdAtendente, setEditIdAtendente] = useState("");
  const [editIsPlantonista, setEditIsPlantonista] = useState(false);
  const [editPosicao, setEditPosicao] = useState(0);

  const roleAuth = String(user?.role || user?.typeUser || "").toLowerCase();
  const isAdmin = roleAuth === "admin" || user?.role === "admin" || user?.typeUser === "admin";

  async function carregarUsuarios() {
    try {
      setLoading(true);
      const data = await userService.listAll();
      setUsuarios(data || []);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || error.message || "Erro ao carregar usuários.");
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
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name || !email || !pass) {
      setErrorMsg("Nome, e-mail e senha são obrigatórios.");
      return;
    }

    if (typeUser === "atendente" && !idAtendente) {
      setErrorMsg("O ID do Atendente (Z-PRO) é obrigatório para usuários do tipo Atendente.");
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.register({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        pass,
        role,
        typeUser,
        id_atendente: typeUser === "atendente" && idAtendente ? idAtendente.trim() : undefined,
        isPlantonista: typeUser === "atendente" ? isPlantonista : false,
        posicao: typeUser === "atendente" && isPlantonista ? Number(posicao) : 0,
      });

      setSuccessMsg(`Usuário '${name}' cadastrado com sucesso!`);
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
      setErrorMsg(error.response?.data?.error || error.message || "Erro ao cadastrar usuário.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenEdit(usr: UserItem) {
    setEditingUser(usr);
    setEditName(usr.name || "");
    setEditEmail(usr.email || "");
    setEditPass("");
    setEditRole(usr.role || (usr.typeUser === "admin" ? "admin" : "comum"));
    setEditTypeUser(usr.typeUser === "comum" ? "comum" : "atendente");
    setEditIdAtendente(usr.id_atendente || "");
    setEditIsPlantonista(Boolean(usr.isPlantonista));
    setEditPosicao(usr.posicao || 0);
  }

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();
    if (!editingUser) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!editName || !editEmail) {
      setErrorMsg("Nome e e-mail são obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.update(editingUser.id, {
        name: editName.trim(),
        email: editEmail.toLowerCase().trim(),
        pass: editPass ? editPass.trim() : undefined,
        role: editRole,
        typeUser: editTypeUser,
        id_atendente: editTypeUser === "atendente" && editIdAtendente ? editIdAtendente.trim() : null,
        isPlantonista: editTypeUser === "atendente" ? editIsPlantonista : false,
        posicao: editTypeUser === "atendente" && editIsPlantonista ? Number(editPosicao) : 0,
      });

      setSuccessMsg(`Dados do usuário '${editName}' atualizados com sucesso!`);
      setEditingUser(null);
      carregarUsuarios();
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || error.message || "Erro ao atualizar usuário.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteUser(usr: UserItem) {
    if (!confirm(`Deseja realmente excluir o usuário '${usr.name}' (${usr.email})? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      await userService.delete(usr.id);
      setSuccessMsg(`Usuário '${usr.name}' excluído com sucesso!`);
      carregarUsuarios();
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || error.message || "Erro ao excluir usuário.");
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
              Cadastre, edite níveis de acesso (Admin, Gestor ou Comum) e dados do Z-PRO/Plantão.
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setShowCreateCard(!showCreateCard);
            setEditingUser(null);
          }}
          variant={showCreateCard ? "outline" : "primary"}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer"
        >
          {showCreateCard ? <X size={13} /> : <Plus size={13} />}
          <span>{showCreateCard ? "Cancelar" : "Novo Usuário"}</span>
        </Button>
      </div>

      {/* FEEDBACKS */}
      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between text-red-300 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-200 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-between text-emerald-300 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MODAL DE EDIÇÃO DE USUÁRIO */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full p-5 space-y-4 shadow-xs my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-zinc-100">Editar Dados do Usuário</h2>
                  <p className="text-[11px] text-zinc-400">Alterando informações de {editingUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nome Completo *"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={isSubmitting}
                />
                <Input
                  label="E-mail *"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Input
                  label="Nova Senha (Deixe em branco para manter a atual)"
                  type="password"
                  placeholder="••••••••"
                  value={editPass}
                  onChange={(e) => setEditPass(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-300">Nível de Acesso (Permissões) *</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-blue-500 h-9"
                  >
                    <option value="comum">Usuário Comum (Acesso Padrão)</option>
                    <option value="gestor">Gestor (Acesso Operacional Completo)</option>
                    <option value="admin">Administrador (Acesso Total / Gestão Geral)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-300">Tipo de Usuário (Função) *</label>
                  <select
                    value={editTypeUser}
                    onChange={(e) => setEditTypeUser(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-blue-500 h-9"
                  >
                    <option value="atendente">Atendente (Z-PRO & Plantão)</option>
                    <option value="comum">Usuário Comum (Sem Z-PRO)</option>
                  </select>
                </div>
              </div>

              {editTypeUser === "atendente" && (
                <div className="p-4 bg-zinc-950/60 border border-blue-500/20 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <Input
                      label="ID do Atendente no Z-PRO"
                      placeholder="Ex: 20"
                      value={editIdAtendente}
                      onChange={(e) => setEditIdAtendente(e.target.value)}
                      disabled={isSubmitting}
                    />

                    <div className="flex items-center h-9 px-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-200">
                        <input
                          type="checkbox"
                          checked={editIsPlantonista}
                          onChange={(e) => setEditIsPlantonista(e.target.checked)}
                          disabled={isSubmitting}
                          className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
                        />
                        <span>Participa do Plantão?</span>
                      </label>
                    </div>
                  </div>

                  {editIsPlantonista && (
                    <div className="pt-2 border-t border-zinc-800/60 max-w-xs">
                      <label className="block text-[11px] text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Posição na Escala Automática:
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editPosicao}
                        onChange={(e) => setEditPosicao(Number(e.target.value))}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs font-mono focus:outline-none focus:border-emerald-500 h-9"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUser(null)}
                  className="px-4 text-xs cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isSubmitting} className="px-5 text-xs cursor-pointer">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Card Novo Usuário */}
      {showCreateCard && (
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-in slide-in-from-top-2 duration-200 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Cadastrar Novo Usuário</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Defina as permissões de acesso e dados de integração com o Z-PRO.
            </p>
          </div>

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

            {/* Linha 2: Nível de Acesso (Admin / Gestor / Comum) e Tipo de Usuário (Atendente / Comum) */}
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
                  <option value="gestor">Gestor (Acesso Operacional Completo)</option>
                  <option value="admin">Administrador (Acesso Total / Gestão Geral)</option>
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
                className="px-4 text-xs cursor-pointer"
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting} className="px-5 text-xs cursor-pointer">
                Salvar Usuário
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Renderização da Tabela com Ações */}
      <UserTable
        usuarios={usuarios}
        isLoading={loading}
        onEditClick={handleOpenEdit}
        onDeleteClick={handleDeleteUser}
      />
    </div>
  );
}