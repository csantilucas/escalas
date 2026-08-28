// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EscalaTable, RegistroEscala } from "@/components/ui/EscalaTable";
import { NextShiftCard } from "@/components/ui/NextShiftCard";
import { AnalistaMetricCard } from "@/components/ui/AnalistaMetricCard";
import { registroService, dashboardService, TicketUserData } from "@/services";
import { CalendarEscala } from "@/components/ui/CalendarEscala";

export default function DashboardPage() {
  const { user } = useAuth();
  const [escalas, setEscalas] = useState<RegistroEscala[]>([]);
  const [report, setReport] = useState<TicketUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosDashboard() {
      try {
        setLoading(true);
        // Formata a data atual em YYYY-MM-DD
        const hojeStr = new Date().toISOString().split("T")[0];

        // Executa as chamadas sem deixar o erro do microsserviço derrubar a tela inteira
        const [escalasData, metricsData] = await Promise.all([
          registroService.list(1).catch((err) => {
            console.error("Erro ao buscar escalas:", err);
            return { registros: [] };
          }),
          dashboardService.getTicketsReport(hojeStr, hojeStr).catch((err) => {
            console.error("Erro ao buscar métricas de chamados:", err);
            return [];
          })
        ]);

        setEscalas(escalasData?.registros || []);
        setReport(Array.isArray(metricsData) ? metricsData : []);
      } catch (error) {
        console.error("Erro ao carregar dados para a dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  return (
    <div className="flex flex-col gap-4 font-sans antialiased text-left">

      {/* Cabeçalho de Boas-vindas */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-sm font-bold text-zinc-100">Visão Geral</h1>
        <p className="text-[11px] text-zinc-500">
          Bem-vindo de volta, {user?.name}.
        </p>
      </div>

      {/* Grid de Cards Compactos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Card 1: Informações de Acesso */}
        <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col justify-between h-[100px]">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Seu Acesso
          </span>
          <div className="flex flex-col gap-0.5 mt-auto">
            <p className="text-xs font-semibold text-zinc-200 capitalize">
              {user?.typeUser}
            </p>
            <p className="text-[10px] text-zinc-500">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Card 2: Próximo Analista Ativo da Fila */}
        <NextShiftCard />
      </div>

      <p className="text-xs font-semibold text-zinc-400 mt-2">Plantões</p>
     
      {/* Seção da Tabela de Plantões */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Tabela de Plantões */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Próximos Plantões Gerados
            </h2>
            <p className="text-[10px] text-zinc-600">
              Últimas escalas ativas programadas na fila
            </p>
          </div>
          <EscalaTable registros={escalas} isLoading={loading} isAdmin={false} />
        </div>

        {/* Calendário de Escalas */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Distribuição Mensal
            </h2>
            <p className="text-[10px] text-zinc-600">
              Visualização rápida do mês vigente
            </p>
          </div>
          <CalendarEscala registros={escalas} />
        </div>
      </div>

      <p className="text-xs font-semibold text-zinc-400 mt-2">Métricas</p>
      
      {/* Seção: Métricas de Chamados */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Métricas de Chamados (Hoje)
          </h2>
          <p className="text-[10px] text-zinc-600">
            Produtividade e tempos médios extraídos do microsserviço
          </p>
        </div>

        {loading ? (
          <div className="text-xs text-zinc-600 animate-pulse">Buscando métricas externas...</div>
        ) : report.length === 0 ? (
          <div className="text-xs text-zinc-500 italic p-3 border border-dashed border-zinc-800/80 rounded-lg bg-zinc-900/20">
            Nenhuma atividade registrada no microsserviço até o momento.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5 items-stretch">
            {report.map((analista: TicketUserData, index: number) => {
              // Garante uma key única combinando o e-mail/nome com o índice
              const keyUnica = `analista-${analista.email || analista.name || 'desconhecido'}-${index}`;
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