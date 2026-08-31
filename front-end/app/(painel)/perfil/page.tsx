// src/app/perfil/page.tsx
"use client";

import { useEffect, useState, useMemo, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { registroService, atendimentoService, userService, AtendimentoModel } from "@/services";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  User,
  Calendar,
  Clock,
  CheckCircle2,
  Headphones,
  CalendarDays,
  Sparkles,
  Shield,
  ChevronLeft,
  ChevronRight,
  Hash,
  Edit2,
  X,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { formatarData, formatarHora, formatarDiaSemana, formatarDataHora } from "@/lib/dateUtils";

export default function PerfilPage() {
  const { user, refreshSession } = useAuth();
  const [escalas, setEscalas] = useState<any[]>([]);
  const [atendimentos, setAtendimentos] = useState<AtendimentoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesSelecionado, setMesSelecionado] = useState(new Date());

  // Estados para Modal de Edição de Perfil
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const carregarDadosUsuario = async () => {
    try {
      setLoading(true);
      // Busca escalas gerais
      const escalasRes = await registroService.list(1);
      if (escalasRes && escalasRes.registros) {
        setEscalas(escalasRes.registros);
      }

      // Busca atendimentos do atendente logado
      if (user?.name) {
        const atendRes = await atendimentoService.list({
          atendente: user.name,
          limit: 10,
        });
        if (atendRes && atendRes.data) {
          setAtendimentos(atendRes.data);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar dados do perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosUsuario();
  }, [user]);

  function handleOpenEdit() {
    setNome(user?.name || "");
    setEmail(user?.email || "");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setErrorMsg(null);
    setSuccessMsg(null);
    setModalEditOpen(true);
  }

  async function handleSalvarPerfil(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!nome.trim() || !email.trim()) {
      setErrorMsg("Nome e e-mail são obrigatórios.");
      return;
    }

    if (novaSenha && novaSenha !== confirmarSenha) {
      setErrorMsg("A nova senha e a confirmação não conferem.");
      return;
    }

    setSubmitting(true);
    try {
      await userService.updateProfile({
        name: nome.trim(),
        email: email.toLowerCase().trim(),
        pass: novaSenha ? novaSenha.trim() : undefined,
      });

      await refreshSession();
      setSuccessMsg("Seu perfil foi atualizado com sucesso!");
      setTimeout(() => {
        setModalEditOpen(false);
        setSuccessMsg(null);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao atualizar perfil.");
    } finally {
      setSubmitting(false);
    }
  }

  // Filtra as escalas pertencentes ao usuário logado
  const minhasEscalas = useMemo(() => {
    if (!user) return [];
    return escalas.filter((e) => {
      const matchId = e.user_id === user.id || e.user?.id === user.id;
      const matchName = e.user?.name && user.name && e.user.name.toLowerCase() === user.name.toLowerCase();
      const matchAtendente = e.user?.id_atendente && user.id_atendente && e.user.id_atendente === user.id_atendente;
      return matchId || matchName || matchAtendente;
    });
  }, [escalas, user]);

  // Próximo plantão
  const proximoPlantao = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const futuros = minhasEscalas
      .map((e) => ({ ...e, dataObj: new Date(e.data || e.startTime) }))
      .filter((e) => e.dataObj >= hoje)
      .sort((a, b) => a.dataObj.getTime() - b.dataObj.getTime());

    return futuros[0] || null;
  }, [minhasEscalas]);

  // Dias do mês atual para o mini calendário
  const diasDoMes = useMemo(() => {
    const ano = mesSelecionado.getFullYear();
    const mes = mesSelecionado.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const dias: Array<{ dia: number; dataStr: string; temPlantao: boolean; escala?: any }> = [];

    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const escalaDoDia = minhasEscalas.find((e) => {
        const dStr = (e.data || e.startTime || "").substring(0, 10);
        return dStr === dataStr;
      });

      dias.push({
        dia: d,
        dataStr,
        temPlantao: !!escalaDoDia,
        escala: escalaDoDia,
      });
    }

    return {
      dias,
      primeiroDiaSemana: primeiroDia.getDay(),
      nomeMes: mesSelecionado.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
    };
  }, [mesSelecionado, minhasEscalas]);

  const mudarMes = (delta: number) => {
    setMesSelecionado((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const roleAuth = String(user?.role || user?.typeUser || "").toLowerCase();
  const roleLabel =
    roleAuth === "admin"
      ? "Administrador"
      : roleAuth === "gestor"
      ? "Gestor"
      : "Usuário Comum";

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* HEADER DE PERFIL */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-blue-500/20 border border-blue-400/30 shrink-0">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "US"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-zinc-100">{user?.name || "Usuário"}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 capitalize">
                  {roleLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 capitalize">
                  {user?.typeUser === "atendente" ? "Atendente" : "Geral"}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{user?.email || "Sem e-mail"}</p>
              {user?.id_atendente && (
                <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                  ID Atendente Z-PRO: <span className="text-emerald-400 font-semibold">{user.id_atendente}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* BOTÃO EDITAR PERFIL */}
            <Button
              onClick={handleOpenEdit}
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer"
            >
              <Edit2 size={13} className="text-blue-400" />
              <span>Editar Meus Dados</span>
            </Button>

            {/* CARD DE PRÓXIMO PLANTÃO */}
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-md sm:min-w-[220px] shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Próximo Plantão</span>
              </div>
              {proximoPlantao ? (
                <div>
                  <p className="text-xs font-bold text-emerald-400">
                    {formatarDiaSemana(proximoPlantao.data || proximoPlantao.startTime, "short")}, {formatarData(proximoPlantao.data || proximoPlantao.startTime)}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Horário: {formatarHora(proximoPlantao.startTime)} às {formatarHora(proximoPlantao.endTime)}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-zinc-500 italic">Nenhum plantão agendado.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO DE PERFIL */}
      {modalEditOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-lg w-full p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-zinc-100">Editar Meu Perfil</h2>
                  <p className="text-[11px] text-zinc-400">Atualize seus dados cadastrais e senha de acesso.</p>
                </div>
              </div>
              <button
                onClick={() => setModalEditOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSalvarPerfil} className="space-y-4">
              <Input
                label="Nome Completo *"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={submitting}
              />
              <Input
                label="E-mail *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />

              <div className="pt-2 border-t border-zinc-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Alterar Senha (Opcional)</span>
                </div>
                <Input
                  label="Nova Senha (deixe em branco se não desejar alterar)"
                  type="password"
                  placeholder="••••••••"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  disabled={submitting}
                />
                {novaSenha && (
                  <Input
                    label="Confirmar Nova Senha *"
                    type="password"
                    placeholder="••••••••"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    disabled={submitting}
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalEditOpen(false)}
                  className="px-4 text-xs cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={submitting} className="px-5 text-xs cursor-pointer">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Meus Plantões</p>
            <p className="text-2xl font-bold text-zinc-100 mt-1">{minhasEscalas.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <CalendarDays className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Meus Atendimentos</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{atendimentos.length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Headphones className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Nível de Acesso</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1 capitalize">
              {roleLabel}
            </p>
          </div>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* CALENDÁRIO PESSOAL E LISTA DE PLANTÕES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MINI CALENDÁRIO PESSOAL */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-zinc-100 capitalize">{diasDoMes.nomeMes}</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => mudarMes(-1)}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => mudarMes(1)}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GRADE DE DIAS */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <span key={d} className="text-zinc-500 font-semibold py-1">
                {d}
              </span>
            ))}

            {Array.from({ length: diasDoMes.primeiroDiaSemana }).map((_, i) => (
              <div key={`empty-${i}`} className="py-2" />
            ))}

            {diasDoMes.dias.map((d) => (
              <div
                key={d.dia}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  d.temPlantao
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800/50"
                }`}
                title={d.temPlantao ? `Plantão agendado para o dia ${d.dia}` : `Dia ${d.dia}`}
              >
                {d.dia}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
            <span>Dias com seus plantões</span>
          </div>
        </div>

        {/* LISTAGEM DE ESCALAS AGENDADAS */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-400" />
              Minhas Escalas Cadastradas
            </h2>
            <span className="text-xs text-zinc-500 font-mono">{minhasEscalas.length} registros</span>
          </div>

          {minhasEscalas.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              Você ainda não possui escalas vinculadas neste período.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60 max-h-[300px] overflow-y-auto">
              {minhasEscalas.map((esc) => (
                <div key={esc.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-xl text-zinc-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        {formatarDiaSemana(esc.data || esc.startTime, "long")}, {formatarData(esc.data || esc.startTime)}
                      </p>
                      <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {formatarHora(esc.startTime)} até {formatarHora(esc.endTime)}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Confirmado
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MEUS ATENDIMENTOS RECENTES */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Headphones className="w-4 h-4 text-blue-400" />
            Meus Atendimentos Recentes
          </h2>
          <span className="text-xs text-zinc-500 font-mono">{atendimentos.length} atendimentos</span>
        </div>

        {atendimentos.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">
            Nenhum atendimento registrado no seu nome até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[11px] text-zinc-400 uppercase bg-zinc-950/60 border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Protocolo / Data</th>
                  <th className="py-3 px-4">Cliente / Contato</th>
                  <th className="py-3 px-4">CNPJ</th>
                  <th className="py-3 px-4">Ticket Z-PRO</th>
                  <th className="py-3 px-4">Sincronização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {atendimentos.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30">
                    <td className="py-3 px-4 font-mono">
                      <p className="font-semibold text-zinc-100">{item.protocolo || "Sem Protocolo"}</p>
                      <p className="text-[10px] text-zinc-500">{formatarDataHora(item.createdAt)}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-zinc-200">{item.nomeContato || "Não identificado"}</p>
                      <p className="text-[10px] text-zinc-500">{item.tipoAtendimento || "Geral"}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-400">{item.cnpj || "-"}</td>
                    <td className="py-3 px-4 font-mono text-cyan-400">{item.ticketZpro || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.sincronizado
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {item.sincronizado ? "Sincronizado" : "Pendente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
