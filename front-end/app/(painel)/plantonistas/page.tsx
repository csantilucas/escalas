// src/app/plantonistas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { EscalaTable, RegistroEscala } from "@/components/ui/EscalaTable";
import { VincularPlantonistaCard } from "@/components/ui/VincularPlantonistaCard";
import { GerarEscalaLoopCard } from "@/components/ui/GerarEscalaLoopCard";
import { CriarEscalaManualCard } from "@/components/ui/CriarEscalaManualCard";
import { ShieldAlert, CalendarRange, UserPlus, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { registroService, userService } from "@/services";
import { CalendarEscala } from "@/components/ui/CalendarEscala";

export default function PlantonistasPage() {
  const { user } = useAuth();
  const [registros, setRegistros] = useState<RegistroEscala[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);

  const [activeCard, setActiveCard] = useState<"vincular" | "gerar" | "criar" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para a Modal Flutuante de Edição
  const [escalaParaEditar, setEscalaParaEditar] = useState<RegistroEscala | null>(null);
  const [formDataEdit, setFormDataEdit] = useState({
    userId: "",
    data: "",
    startTime: "",
    endTime: ""
  });

  const role = String(user?.role || user?.typeUser || "").toLowerCase();
  const isAdmin = role === "admin" || user?.role === "admin" || user?.typeUser === "admin";
  const isGestor = role === "gestor" || user?.role === "gestor" || user?.typeUser === "gestor";
  const canEdit = isAdmin || isGestor;

  async function carregarEscalas(page: number) {
    try {
      setLoading(true);
      const data = await registroService.list(page);
      setRegistros(data.registros || []);
      setTotalPaginas(data.pages || 1);
      setPaginaAtual(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarEscalas(paginaAtual);
    if (canEdit) {
      userService.listAll().then(setListaUsuarios).catch(() => setListaUsuarios([]));
    }
  }, [canEdit, paginaAtual]);

  // Handler disparado pelo clique do lápis dentro da tabela
  async function handleAbrirEdicao(escala: RegistroEscala) {
    try {
      const dadosOriginais = await registroService.findById(escala.id);
      setEscalaParaEditar(dadosOriginais);

      const formatarParaInputLocal = (isoStr: string) => {
        if (!isoStr) return "";
        if (isoStr.includes("T")) {
          return isoStr.substring(0, 16);
        }
        return isoStr;
      };

      setFormDataEdit({
        userId: dadosOriginais.user_id,
        data: formatarParaInputLocal(dadosOriginais.data),
        startTime: formatarParaInputLocal(dadosOriginais.startTime),
        endTime: formatarParaInputLocal(dadosOriginais.endTime)
      });
    } catch (error) {
      console.error("Erro ao carregar dados do registro:", error);
      alert("Não foi possível carregar os dados atualizados deste plantão.");
    }
  }

  async function handleExcluirEscala(escala: RegistroEscala) {
    const nomePlantonista = escala.user?.name || "Não atribuído";
    const postoAtendimento = escala.plantao?.nome || "Não informado";

    const confirmar = window.confirm(
      `Tens a certeza que desejas apagar permanentemente a escala do plantonista "${nomePlantonista}" no posto "${postoAtendimento}"?`
    );

    if (!confirmar) return;

    try {
      setLoading(true);
      await registroService.delete(escala.id);

      const novaPagina = registros.length === 1 && paginaAtual > 1 ? paginaAtual - 1 : paginaAtual;
      carregarEscalas(novaPagina);
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      alert("Erro ao excluir o registro de escala de plantão.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!escalaParaEditar) return;

    setIsSubmitting(true);
    try {
      if (formDataEdit.userId !== escalaParaEditar.user_id) {
        await registroService.transfer(escalaParaEditar.id, formDataEdit.userId);
      }

      await registroService.update(escalaParaEditar.id, {
        data: formDataEdit.data.includes("Z") ? formDataEdit.data : `${formDataEdit.data}:00.000Z`,
        startTime: formDataEdit.startTime.includes("Z") ? formDataEdit.startTime : `${formDataEdit.startTime}:00.000Z`,
        endTime: formDataEdit.endTime.includes("Z") ? formDataEdit.endTime : `${formDataEdit.endTime}:00.000Z`
      });

      setEscalaParaEditar(null);
      carregarEscalas(paginaAtual);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao salvar as modificações do registro.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onVincular(userId: string) {
    setIsSubmitting(true);
    try {
      const api = (await import("../../../lib/api")).default;
      await api.post("/plantao", { userId });
      setActiveCard(null);
      carregarEscalas(1);
    } finally { setIsSubmitting(false); }
  }

  async function onGerarLoop(payload: any) {
    setIsSubmitting(true);
    try {
      await registroService.autoGenerate(payload);
      setActiveCard(null);
      carregarEscalas(1);
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao gerar escala automática.");
    } finally { setIsSubmitting(false); }
  }

  async function onCriarManual(payload: any) {
    setIsSubmitting(true);
    try {
      await registroService.registerManual(payload);
      setActiveCard(null);
      carregarEscalas(1);
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao criar registro.");
    } finally { setIsSubmitting(false); }
  }

  return (
    <div className="flex flex-col gap-5 font-sans antialiased text-left select-none">

      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-sm font-bold text-zinc-100">Controle de Plantões</h1>
          <p className="text-xs text-zinc-500 font-medium">Gerencie e distribua as escalas de atendimento em fila</p>
        </div>

        {canEdit ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Button 
              variant={activeCard === "vincular" ? "outline" : "secondary"} 
              onClick={() => setActiveCard(activeCard === "vincular" ? null : "vincular")} 
              className="flex items-center gap-1.5 px-3 h-[32px] text-xs font-semibold cursor-pointer"
            >
              {activeCard === "vincular" ? <X size={12} /> : <UserPlus size={12} />} <span>Plantonista</span>
            </Button>
            <Button 
              variant={activeCard === "gerar" ? "outline" : "secondary"} 
              onClick={() => setActiveCard(activeCard === "gerar" ? null : "gerar")} 
              className="flex items-center gap-1.5 px-3 h-[32px] text-xs font-semibold cursor-pointer"
            >
              {activeCard === "gerar" ? <X size={12} /> : <CalendarRange size={12} />} <span>Gerar Loop</span>
            </Button>
            <Button 
              variant={activeCard === "criar" ? "outline" : "primary"} 
              onClick={() => setActiveCard(activeCard === "criar" ? null : "criar")} 
              className="flex items-center gap-1.5 px-3 h-[32px] text-xs font-semibold cursor-pointer"
            >
              {activeCard === "criar" ? <X size={12} /> : <Plus size={12} />} <span>Criar Escala</span>
            </Button>
          </div>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 border border-zinc-700/60 text-zinc-400">
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
            Modo Leitura
          </span>
        )}
      </div>

      {/* Cards de Ação Rápidas */}
      {canEdit && activeCard && (
        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg shadow-xs">
          {activeCard === "vincular" && <VincularPlantonistaCard usuarios={listaUsuarios} isSubmitting={isSubmitting} onSubmit={onVincular} />}
          {activeCard === "gerar" && <GerarEscalaLoopCard isSubmitting={isSubmitting} onSubmit={onGerarLoop} />}
          {activeCard === "criar" && <CriarEscalaManualCard usuarios={listaUsuarios} isSubmitting={isSubmitting} onSubmit={onCriarManual} />}
        </div>
      )}

      {/* Tabela de Escalas de Plantões */}
      <div className="flex flex-col gap-3">
        <EscalaTable
          registros={registros}
          isLoading={loading}
          isAdmin={canEdit}
          onEditClick={handleAbrirEdicao}
          onDeleteClick={handleExcluirEscala}
        />

        {totalPaginas > 1 && (
          <div className="flex items-center justify-between pt-1 px-1 text-xs text-zinc-500">
            <span>Página <strong className="text-zinc-300 font-medium">{paginaAtual}</strong> de {totalPaginas}</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} 
                disabled={paginaAtual === 1 || loading} 
                className="p-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 text-zinc-400 disabled:opacity-30 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} 
                disabled={paginaAtual === totalPaginas || loading} 
                className="p-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 text-zinc-400 disabled:opacity-30 transition-all cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEÇÃO DO CALENDÁRIO */}
      <div className="border-t border-zinc-800 pt-4 mt-1 flex flex-col gap-2.5">
        <div className="flex flex-col gap-0.5 text-left">
          <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Distribuição Mensal
          </h2>
          <p className="text-[11px] text-zinc-500">
            Visualização rápida das escalas programadas para o mês vigente
          </p>
        </div>
        
        <div className="w-full">
          <CalendarEscala registros={registros} />
        </div>
      </div>

      {/* MODAL DE EDIÇÃO */}
      {escalaParaEditar && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={() => setEscalaParaEditar(null)}
        >
          <div 
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg shadow-xs overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
              <h3 className="text-xs font-semibold text-zinc-200">Editar Registro de Escala</h3>
              <button 
                type="button" 
                onClick={() => setEscalaParaEditar(null)} 
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSalvarEdicao}>
              {/* Body */}
              <div className="p-5 flex flex-col gap-4 text-xs font-medium">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-zinc-500">Posto de Atendimento</label>
                  <input
                    type="text"
                    value={escalaParaEditar.plantao?.nome || "Não informado"}
                    className="w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 text-zinc-400 font-medium cursor-not-allowed outline-none"
                    disabled
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-zinc-500">Transferir Atendente Responsável</label>
                  <select
                    value={formDataEdit.userId}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, userId: e.target.value })}
                    className="w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 text-zinc-200 font-medium outline-none focus:border-zinc-700"
                    required
                  >
                    {listaUsuarios.map((u: any) => (
                      <option key={u.id} value={u.id} className="bg-zinc-950 text-zinc-350">
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-zinc-500">Data de Referência</label>
                  <input
                    type="datetime-local"
                    value={formDataEdit.data}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, data: e.target.value })}
                    className="w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 text-zinc-200 font-medium outline-none focus:border-zinc-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-zinc-500">Início do Plantão</label>
                    <input
                      type="datetime-local"
                      value={formDataEdit.startTime}
                      onChange={(e) => setFormDataEdit({ ...formDataEdit, startTime: e.target.value })}
                      className="w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 text-zinc-200 font-medium outline-none focus:border-zinc-700"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-zinc-500">Término do Plantão</label>
                    <input
                      type="datetime-local"
                      value={formDataEdit.endTime}
                      onChange={(e) => setFormDataEdit({ ...formDataEdit, endTime: e.target.value })}
                      className="w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 text-zinc-200 font-medium outline-none focus:border-zinc-700"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-zinc-850 bg-zinc-900/40 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEscalaParaEditar(null)}
                  className="px-4 h-[32px] text-xs"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="px-4 h-[32px] text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold"
                >
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}