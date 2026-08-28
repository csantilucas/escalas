"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { EscalaTable, RegistroEscala } from "@/components/ui/EscalaTable";
import { NextShiftCard } from "@/components/ui/NextShiftCard";
import { AnalistaMetricCard } from "@/components/ui/AnalistaMetricCard";
import {
  registroService,
  dashboardService,
  distribuicaoService,
  TicketUserData,
  PrevisaoFila,
} from "@/services";
import { CalendarEscala } from "@/components/ui/CalendarEscala";
import { GitFork, Zap, Radio, ArrowRight, Clock } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [escalas, setEscalas] = useState<RegistroEscala[]>([]);
  const [report, setReport] = useState<TicketUserData[]>([]);
  const [previsoes, setPrevisoes] = useState<PrevisaoFila[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosDashboard() {
      try {
        setLoading(true);
        const hojeStr = new Date().toISOString().split("T")[0];

        const [escalasData, metricsData, filasData] = await Promise.all([
          registroService.list(1).catch((err) => {
            console.error("Erro ao buscar escalas:", err);
            return { registros: [] };
          }),
          dashboardService.getTicketsReport(hojeStr, hojeStr).catch((err) => {
            console.error("Erro ao buscar métricas de chamados:", err);
            return [];
          }),
          distribuicaoService.getPrevisaoFilas().catch((err) => {
            console.error("Erro ao buscar previsão de filas:", err);
            return [];
          }),
        ]);

        setEscalas(escalasData?.registros || []);
        setReport(Array.isArray(metricsData) ? metricsData : []);
        setPrevisoes(Array.isArray(filasData) ? filasData : []);
      } catch (error) {
        console.error("Erro ao carregar dados para a dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  return (
    <div className="flex flex-col gap-6 font-sans antialiased text-left max-w-7xl mx-auto">
      {/* Cabeçalho de Boas-vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Painel Geral</h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Bem-vindo de volta, <span className="text-zinc-200 font-semibold">{user?.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Sistema Online
          </span>
        </div>
      </div>

      {/* Grid de Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Seu Perfil */}
        <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl flex flex-col justify-between">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Seu Acesso
          </span>
          <div className="flex flex-col gap-0.5 mt-3">
            <p className="text-sm font-bold text-zinc-200 capitalize">
              {user?.role === "admin" ? "Administrador" : user?.typeUser === "atendente" ? "Atendente" : "Usuário Comum"}
            </p>
            <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Card 2: Próximo Plantão */}
        <div className="md:col-span-2">
          <NextShiftCard />
        </div>
      </div>

      {/* SEÇÃO: FILAS AO VIVO */}
      {previsoes.length > 0 && (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                Próximos Atendentes por Fila (WhatsApp)
              </h2>
            </div>
            <Link
              href="/distribuicao"
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Ver painel ao vivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {previsoes.map((p) => (
              <div
                key={p.equipeId}
                className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-zinc-300">{p.equipeNome}</span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>{p.proximoDaFila?.nome || "Aguardando"}</span>
                  </div>
                </div>
                {p.queueId && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    Fila #{p.queueId}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção da Tabela de Plantões */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Plantões & Escalas Ativas</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <EscalaTable registros={escalas} isLoading={loading} isAdmin={false} />
          </div>

          <div className="flex flex-col gap-2">
            <CalendarEscala registros={escalas} />
          </div>
        </div>
      </div>

      {/* Seção: Métricas de Chamados */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
          Métricas de Chamados (Hoje)
        </h2>

        {loading ? (
          <div className="text-xs text-zinc-500 animate-pulse">Buscando métricas externas...</div>
        ) : report.length === 0 ? (
          <div className="text-xs text-zinc-500 italic p-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            Nenhuma atividade registrada no microsserviço até o momento.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5 items-stretch">
            {report.map((analista: TicketUserData, index: number) => {
              const keyUnica = `analista-${analista.email || analista.name || "desconhecido"}-${index}`;
              return (
                <div key={keyUnica} className="h-full">
                  <AnalistaMetricCard dados={analista} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}