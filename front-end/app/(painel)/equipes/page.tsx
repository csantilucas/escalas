"use client";

import { useEffect, useState } from "react";
import {
  equipeService,
  userService,
  EquipePlantao,
  MembroEquipe,
  TurnoTrabalho,
} from "@/services";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  Clock,
  Shuffle,
  Star,
  CheckCircle2,
  XCircle,
  Tag,
  AlertCircle,
  X,
  Layers,
  ShieldAlert,
} from "lucide-react";

export default function EquipesPage() {
  const { user } = useAuth();
  const role = String(user?.role || user?.typeUser || "").toLowerCase();
  const canEdit =
    role === "admin" ||
    role === "gestor" ||
    user?.role === "admin" ||
    user?.role === "gestor" ||
    user?.typeUser === "admin" ||
    user?.typeUser === "gestor";

  const [equipes, setEquipes] = useState<EquipePlantao[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal Equipe (Criar / Editar)
  const [modalEquipeOpen, setModalEquipeOpen] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState<EquipePlantao | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cor, setCor] = useState("#3B82F6");
  const [queueId, setQueueId] = useState<string>("");
  const [queueName, setQueueName] = useState("");
  const [departamentosStr, setDepartamentosStr] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [posicaoFallback, setPosicaoFallback] = useState<number>(0);
  const [ativo, setAtivo] = useState(true);

  // Modal Membro (Vincular / Editar)
  const [modalMembroOpen, setModalMembroOpen] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<EquipePlantao | null>(null);
  const [editingMembro, setEditingMembro] = useState<MembroEquipe | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [cargo, setCargo] = useState("analista_n1");
  const [ordemSequencial, setOrdemSequencial] = useState<number>(1);
  const [pesoPrioridade, setPesoPrioridade] = useState<number>(0);
  const [margemInicio, setMargemInicio] = useState<number>(5);
  const [margemFim, setMargemFim] = useState<number>(5);
  const [turnos, setTurnos] = useState<TurnoTrabalho[]>([
    { inicio: "08:10", fim: "12:20" },
    { inicio: "14:00", fim: "18:00" },
  ]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [equipesData, usersData] = await Promise.all([
        equipeService.getAll(),
        userService.getAll().catch(() => []),
      ]);
      setEquipes(equipesData || []);
      setUsuarios(usersData || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao carregar equipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateEquipeModal = () => {
    setEditingEquipe(null);
    setNome("");
    setDescricao("");
    setCor("#3B82F6");
    setQueueId("");
    setQueueName("");
    setDepartamentosStr("");
    setIsFallback(false);
    setPosicaoFallback(equipes.length + 1);
    setAtivo(true);
    setModalEquipeOpen(true);
  };

  const openEditEquipeModal = (eq: EquipePlantao) => {
    setEditingEquipe(eq);
    setNome(eq.nome);
    setDescricao(eq.descricao || "");
    setCor(eq.cor || "#3B82F6");
    setQueueId(eq.queueId !== null ? String(eq.queueId) : "");
    setQueueName(eq.queueName || "");
    setDepartamentosStr(eq.departamentos ? eq.departamentos.join(", ") : "");
    setIsFallback(eq.isFallback || false);
    setPosicaoFallback(eq.posicaoFallback ?? 0);
    setAtivo(eq.ativo);
    setModalEquipeOpen(true);
  };

  const handleSaveEquipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      const deptosArray = departamentosStr
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);

      const payload = {
        nome,
        descricao,
        cor,
        queueId: queueId ? Number(queueId) : undefined,
        queueName: queueName || undefined,
        departamentos: deptosArray,
        isFallback,
        posicaoFallback: Number(posicaoFallback) || 0,
        ativo,
      };

      if (editingEquipe) {
        await equipeService.update(editingEquipe.id, payload);
        setSuccessMsg(`Equipe '${nome}' atualizada com sucesso!`);
      } else {
        await equipeService.create(payload);
        setSuccessMsg(`Equipe '${nome}' criada com sucesso!`);
      }

      setModalEquipeOpen(false);
      loadData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao salvar equipe.");
    }
  };

  const handleDeleteEquipe = async (id: string, nomeEq: string) => {
    if (!confirm(`Deseja realmente excluir a equipe '${nomeEq}'?`)) return;
    try {
      await equipeService.delete(id);
      setSuccessMsg(`Equipe '${nomeEq}' excluída com sucesso!`);
      loadData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao excluir equipe.");
    }
  };

  const openAddMembroModal = (eq: EquipePlantao) => {
    setSelectedEquipe(eq);
    setEditingMembro(null);
    setSelectedUserId(usuarios[0]?.id || "");
    setCargo("analista_n1");
    setOrdemSequencial(eq.membros ? eq.membros.length + 1 : 1);
    setPesoPrioridade(0);
    setMargemInicio(5);
    setMargemFim(5);
    setTurnos([
      { inicio: "08:10", fim: "12:20" },
      { inicio: "14:00", fim: "18:00" },
    ]);
    setModalMembroOpen(true);
  };

  const openEditMembroModal = (eq: EquipePlantao, membro: MembroEquipe) => {
    setSelectedEquipe(eq);
    setEditingMembro(membro);
    setSelectedUserId(membro.userId);
    setCargo(membro.cargo || "analista_n1");
    setOrdemSequencial(membro.ordemSequencial || 1);
    setPesoPrioridade(membro.pesoPrioridade || 0);
    setMargemInicio(membro.margemInicioMinutos ?? 5);
    setMargemFim(membro.margemFimMinutos ?? 5);
    setTurnos(
      membro.turnos && membro.turnos.length > 0
        ? membro.turnos
        : [{ inicio: "08:00", fim: "18:00" }]
    );
    setModalMembroOpen(true);
  };

  const handleSaveMembro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEquipe) return;

    try {
      setErrorMsg(null);
      const payload = {
        userId: selectedUserId,
        cargo,
        ordemSequencial: Number(ordemSequencial),
        pesoPrioridade: Number(pesoPrioridade),
        turnos,
        margemInicioMinutos: Number(margemInicio),
        margemFimMinutos: Number(margemFim),
        ativo: true,
      };

      if (editingMembro) {
        await equipeService.updateMembro(selectedEquipe.id, editingMembro.userId, payload);
        setSuccessMsg("Membro atualizado com sucesso!");
      } else {
        await equipeService.vincularMembro(selectedEquipe.id, payload);
        setSuccessMsg("Membro vinculado à equipe com sucesso!");
      }

      setModalMembroOpen(false);
      loadData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao salvar membro.");
    }
  };

  const handleDesvincularMembro = async (equipeId: string, userId: string, nomeMembro: string) => {
    if (!confirm(`Deseja desvincular o membro '${nomeMembro}' da equipe?`)) return;
    try {
      await equipeService.desvincularMembro(equipeId, userId);
      setSuccessMsg(`Membro '${nomeMembro}' desvinculado com sucesso!`);
      loadData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao desvincular membro.");
    }
  };

  const handleAddTurno = () => {
    setTurnos([...turnos, { inicio: "08:00", fim: "12:00" }]);
  };

  const handleRemoveTurno = (index: number) => {
    setTurnos(turnos.filter((_, i) => i !== index));
  };

  const handleUpdateTurno = (index: number, field: "inicio" | "fim", value: string) => {
    const updated = [...turnos];
    updated[index][field] = value;
    setTurnos(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">Equipes, Filas & Turnos</h1>
              <p className="text-sm text-zinc-400">
                Gerencie filas do Z-PRO, departamentos atendidos e horários de trabalho de cada analista.
              </p>
            </div>
          </div>
        </div>

        {canEdit ? (
          <button
            onClick={openCreateEquipeModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Equipe</span>
          </button>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 border border-zinc-700/60 text-zinc-400">
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
            Modo Leitura
          </span>
        )}
      </div>

      {/* FEEDBACKS */}
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between text-red-300 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-300 text-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LISTAGEM DE EQUIPES */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-zinc-400 text-xs">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
          Carregando equipes...
        </div>
      ) : equipes.length === 0 ? (
        <div className="p-12 text-center border border-zinc-800 rounded-lg bg-zinc-900/20">
          <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-zinc-400 text-sm font-semibold">Nenhuma equipe cadastrada ainda.</p>
          {canEdit && (
            <p className="text-zinc-500 text-xs mt-0.5">
              Clique no botão acima para criar sua primeira equipe de atendimento.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {equipes.map((equipe) => (
            <div
              key={equipe.id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-5 shadow-xs space-y-4"
            >
              {/* CABEÇALHO DO CARD DA EQUIPE */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div className="flex items-start gap-3">
                  <div
                    className="w-2.5 h-10 rounded-full shrink-0"
                    style={{ backgroundColor: equipe.cor || "#3B82F6" }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-bold text-zinc-100">{equipe.nome}</h2>
                      {equipe.queueId !== null && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          Fila #{equipe.queueId} {equipe.queueName ? `(${equipe.queueName})` : ""}
                        </span>
                      )}
                      {equipe.isFallback && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          Fallback Padrão
                        </span>
                      )}
                      {equipe.posicaoFallback !== undefined && equipe.posicaoFallback !== null && equipe.posicaoFallback > 0 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" title="Ordem na sequência de fallback entre filas">
                          Fallback #{equipe.posicaoFallback}
                        </span>
                      )}
                      {!equipe.ativo && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                          Inativa
                        </span>
                      )}
                    </div>
                    {equipe.descricao && (
                      <p className="text-[11px] text-zinc-400 mt-0.5">{equipe.descricao}</p>
                    )}

                    {/* DEPARTAMENTOS MAPEADOS */}
                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      <Tag className="w-3 h-3 text-zinc-500" />
                      <span className="text-[11px] text-zinc-500 mr-1">Deptos:</span>
                      {equipe.departamentos && equipe.departamentos.length > 0 ? (
                        equipe.departamentos.map((dep, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono"
                          >
                            {dep}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-zinc-600 italic">Nenhum departamento cadastrado</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AÇÕES DA EQUIPE */}
                {canEdit && (
                  <div className="flex items-center gap-1.5 self-end lg:self-center">
                    <button
                      onClick={() => openAddMembroModal(equipe)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-md border border-zinc-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                      <span>Adicionar Membro</span>
                    </button>
                    <button
                      onClick={() => openEditEquipeModal(equipe)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-md border border-zinc-700 transition-colors cursor-pointer"
                      title="Editar Equipe"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEquipe(equipe.id, equipe.nome)}
                      className="p-1.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-md border border-zinc-700 transition-colors cursor-pointer"
                      title="Excluir Equipe"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* LISTA DE MEMBROS DA EQUIPE */}
              <div className="mt-3">
                <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Membros & Turnos de Trabalho ({equipe.membros?.length || 0})
                </h3>

                {!equipe.membros || equipe.membros.length === 0 ? (
                  <div className="p-3 bg-zinc-950/40 border border-zinc-800 rounded-md text-center text-xs text-zinc-500">
                    Nenhum membro vinculado a esta equipe.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {equipe.membros
                      .sort((a, b) => (a.ordemSequencial || 0) - (b.ordemSequencial || 0))
                      .map((membro) => (
                        <div
                          key={membro.id}
                          className="bg-zinc-950 border border-zinc-800 rounded-md p-3 flex flex-col justify-between gap-2.5 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-zinc-800 text-[9px] font-bold text-zinc-300 flex items-center justify-center border border-zinc-700">
                                  {membro.ordemSequencial}
                                </span>
                                <span className="font-semibold text-xs text-zinc-200 truncate">
                                  {membro.user.name}
                                </span>
                              </div>

                              {canEdit && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => openEditMembroModal(equipe, membro)}
                                    className="p-1 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                                    title="Editar Membro"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDesvincularMembro(equipe.id, membro.userId, membro.user.name)
                                    }
                                    className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                                    title="Desvincular Membro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-500">
                              <span>{membro.user.email}</span>
                              {membro.user.zproId && (
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  (Z-PRO: {membro.user.zproId})
                                </span>
                              )}
                            </div>

                            {/* TURNOS */}
                            <div className="mt-2.5 pt-2.5 border-t border-zinc-800/60 flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Turnos:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {membro.turnos && membro.turnos.length > 0 ? (
                                  membro.turnos.map((t, tidx) => (
                                    <span
                                      key={tidx}
                                      className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                                    >
                                      {t.inicio} - {t.fim}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[11px] text-zinc-600 italic">08:00 - 18:00</span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-500 mt-0.5">
                                Margem: ±{membro.margemInicioMinutos}min início / ±{membro.margemFimMinutos}min fim
                              </span>
                            </div>
                          </div>

                          {/* PRIORIDADE */}
                          <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-500">
                            <span>Cargo: {membro.cargo || "analista"}</span>
                            {membro.pesoPrioridade > 0 && (
                              <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" /> Prioritário
                              </span>
                            )}
                            {membro.pesoPrioridade < 0 && (
                              <span className="text-zinc-400 font-semibold">Último recurso</span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL CRIAR/EDITAR EQUIPE */}
      {modalEquipeOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-100">
                {editingEquipe ? "Editar Equipe" : "Nova Equipe de Atendimento"}
              </h2>
              <button
                onClick={() => setModalEquipeOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEquipe} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nome da Equipe *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: N1 - Suporte Operacional"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Primeiro nível de suporte técnico e triagem"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">ID da Fila Z-PRO</label>
                  <input
                    type="number"
                    placeholder="Ex: 6"
                    value={queueId}
                    onChange={(e) => setQueueId(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nome da Fila</label>
                  <input
                    type="text"
                    placeholder="Ex: N1-Suporte"
                    value={queueName}
                    onChange={(e) => setQueueName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Departamentos Atendidos (separados por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="Ex: suporte, suporte_operacional, operacional"
                  value={departamentosStr}
                  onChange={(e) => setDepartamentosStr(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Posição de Fallback da Fila
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Ex: 1, 2, 3..."
                    value={posicaoFallback}
                    onChange={(e) => setPosicaoFallback(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Prioridade no fallback (1 = primeira fila consultada se a fila original estiver sem analistas online).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Cor da Tag</label>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="color"
                      value={cor}
                      onChange={(e) => setCor(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <span className="text-xs text-zinc-400 font-mono">{cor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 pb-1 border-t border-zinc-800/60">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isFallback}
                    onChange={(e) => setIsFallback(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
                  />
                  <span>Equipe Padrão do Sistema</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
                  />
                  <span>Equipe Ativa</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalEquipeOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Salvar Equipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VINCULAR/EDITAR MEMBRO */}
      {modalMembroOpen && selectedEquipe && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-zinc-100">
                  {editingMembro ? "Editar Membro" : "Vincular Membro"}
                </h2>
                <p className="text-xs text-zinc-400">Equipe: {selectedEquipe.nome}</p>
              </div>
              <button
                onClick={() => setModalMembroOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMembro} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Usuário / Analista *</label>
                {editingMembro ? (
                  <input
                    type="text"
                    disabled
                    value={editingMembro.user.name + " (" + editingMembro.user.email + ")"}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 text-sm cursor-not-allowed"
                  />
                ) : (
                  <select
                    required
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email || u.id_atendente || "analista"})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Cargo / Função</label>
                  <input
                    type="text"
                    placeholder="Ex: analista_n1"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Ordem na Fila (Sequencial)</label>
                  <input
                    type="number"
                    min="1"
                    value={ordemSequencial}
                    onChange={(e) => setOrdemSequencial(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Peso de Prioridade</label>
                <select
                  value={pesoPrioridade}
                  onChange={(e) => setPesoPrioridade(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="0">Normal (Score Ponderado padrão)</option>
                  <option value="1">⭐ Prioridade Alta (Recebe primeiro se online)</option>
                  <option value="-1">🛡️ Último Recurso (Recebe apenas se todos ocupados/offline)</option>
                </select>
              </div>

              {/* CONFIGURAÇÃO DE TURNOS */}
              <div className="p-3.5 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-200">Horários de Expediente / Turnos</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTurno}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    + Adicionar Turno
                  </button>
                </div>

                {turnos.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 w-14">Turno {idx + 1}:</span>
                    <input
                      type="time"
                      value={t.inicio}
                      onChange={(e) => handleUpdateTurno(idx, "inicio", e.target.value)}
                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-zinc-500">até</span>
                    <input
                      type="time"
                      value={t.fim}
                      onChange={(e) => handleUpdateTurno(idx, "fim", e.target.value)}
                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                    />
                    {turnos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTurno(idx)}
                        className="p-1 text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Margem Início (minutos)</label>
                    <input
                      type="number"
                      min="0"
                      value={margemInicio}
                      onChange={(e) => setMargemInicio(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Margem Fim (minutos)</label>
                    <input
                      type="number"
                      min="0"
                      value={margemFim}
                      onChange={(e) => setMargemFim(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalMembroOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Salvar Membro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
