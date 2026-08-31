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
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { GitFork, Zap, Radio, ArrowRight, Clock, Tv } from "lucide-react";
import { obterHojeStr } from "@/lib/dateUtils";

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
        const hojeStr = obterHojeStr();

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
    <div className="flex flex-col gap-5 font-sans antialiased text-left max-w-7xl mx-auto">
      {/* Cabeçalho de Boas-vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/50 p-5 rounded-lg border border-zinc-800 shadow-xs">
        <div>
          <h1 className="text-base font-bold text-zinc-100 tracking-tight">Painel Operacional</h1>
          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
            Sessão iniciada como <span className="text-zinc-200 font-semibold">{user?.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <ThemeToggle />

          <Link
            href="/tv"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all shadow-xs"
          >
            <Tv className="w-3.5 h-3.5 text-blue-400" />
            <span>Modo TV</span>
          </Link>

          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Radio className="w-3 h-3 text-emerald-400" />
            Online
          </span>
        </div>
      </div>

      {/* Grid de Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Card 1: Seu Perfil */}
        <div className="p-3.5 bg-zinc-900/40 border border-zinc-800 rounded-lg flex flex-col justify-between h-[90px] shadow-xs">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Nível de Permissão
          </span>
          <div className="flex flex-col gap-0.5 mt-1">
            <p className="text-xs font-semibold text-zinc-200 capitalize">
              {user?.role === "admin" ? "Administrador" : user?.typeUser === "atendente" ? "Atendente" : "Usuário Comum"}
            </p>
            <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Card 2: Próximo Plantão */}
        <div className="md:col-span-2">
          <NextShiftCard />
        </div>
      </div>

      {/* SEÇÃO: FILAS AO VIVO */}
      {previsoes.length > 0 && (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                Próximos a Receber Chat por Fila (WhatsApp)
              </h2>
            </div>
            <Link
              href="/distribuicao"
              className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Ver distribuição detalhada</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {previsoes.map((p) => (
              <div
                key={p.equipeId}
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-between gap-2 shadow-xs"
              >
                <div>
                  <span className="text-xs font-semibold text-zinc-200">{p.equipeNome}</span>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium mt-0.5">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>{p.proximoDaFila?.nome || "Aguardando"}</span>
                  </div>
                </div>
                {p.queueId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 border border-zinc-700 text-zinc-300">
                    #{p.queueId}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção da Tabela de Plantões */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Plantões & Escalas Ativas</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
          <div className="lg:col-span-2">
            <EscalaTable registros={escalas} isLoading={loading} isAdmin={false} />
          </div>

          <div className="flex flex-col gap-2">
            <CalendarEscala registros={escalas} />
          </div>
        </div>
      </div>

      {/* Seção: Métricas de Chamados */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Produtividade dos Analistas (Hoje)
        </h2>

        {loading ? (
          <div className="text-xs text-zinc-500 animate-pulse">Sincronizando métricas em tempo real...</div>
        ) : report.length === 0 ? (
          <div className="text-xs text-zinc-500 p-4 border border-zinc-800 rounded-lg bg-zinc-900/20 text-center">
            Nenhuma atividade registrada no microsserviço até o momento.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3 items-stretch">
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