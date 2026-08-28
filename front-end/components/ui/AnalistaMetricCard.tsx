// src/components/ui/AnalistaMetricCard.tsx
"use client";

import { TicketUserData } from "@/services";
import { User, MessageSquare, Clock, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";

interface AnalistaMetricCardProps {
  dados: TicketUserData;
}

export function AnalistaMetricCard({ dados }: AnalistaMetricCardProps) {
  const tmaMinutos = dados.tma?.minutes ?? 0;
  const tmeMinutos = dados.tme?.minutes ?? 0;

  return (
    <div className="w-full h-full bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-zinc-700 transition-all select-none font-sans antialiased text-left">
      
      {/* Container Superior (Info + Grid de Contadores) */}
      <div className="flex flex-col gap-4">
        {/* Cabeçalho: Nome e Informações do Analista */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
          <div className="p-2 bg-zinc-800/50 border border-zinc-700/60 rounded-lg text-zinc-300 shrink-0">
            <User size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            {/* 🟢 FONTE ATUALIZADA: Nome um pouco maior */}
            <span className="text-base font-semibold text-zinc-100 truncate">
              {dados.name || "Sem Nome"}
            </span>
            <span className="text-xs text-zinc-500 truncate mt-0.5">
              {dados.email || "Sem e-mail cadastrado"}
            </span>
          </div>
        </div>

        {/* Grid Principal: Métricas de Chamados */}
        <div className="grid grid-cols-3 gap-2.5">
          
          {/* Em Atendimento */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-lg text-center min-h-[68px] flex-1">
            <div className="flex items-center gap-1 text-yellow-500/90">
              <AlertCircle size={12} className="shrink-0" />
              <span className="text-[11px] font-medium text-zinc-400">Em curso</span>
            </div>
            <span className="text-lg font-semibold text-yellow-500 mt-1">
              {dados.qtd_em_atendimento || "0"}
            </span>
          </div>

          {/* Pendentes */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-lg text-center min-h-[68px] flex-1">
            <div className="flex items-center gap-1 text-zinc-500">
              <MessageSquare size={12} className="shrink-0" />
              <span className="text-[11px] font-medium text-zinc-400">Pendentes</span>
            </div>
            <span className="text-lg font-semibold text-zinc-300 mt-1">
              {dados.qtd_pendentes || "0"}
            </span>
          </div>

          {/* Resolvidos */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-lg text-center min-h-[68px] flex-1">
            <div className="flex items-center gap-1 text-green-500/90">
              <CheckCircle2 size={12} className="shrink-0" />
              <span className="text-[11px] font-medium text-zinc-400">Resolvidos</span>
            </div>
            <span className="text-lg font-semibold text-green-500 mt-1">
              {dados.qtd_resolvidos || "0"}
            </span>
          </div>

        </div>
      </div>

      {/* Rodapé: Tempos Médios e Produtividade Total */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col gap-3 text-sm mt-auto">
        
        {/* Total Acumulado */}
        <div className="flex justify-between items-center text-zinc-400 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <BarChart3 size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Volume total de tickets</span>
          </div>
          <span className="font-semibold text-zinc-200 shrink-0">
            {dados.qtd_por_usuario || "0"}
          </span>
        </div>

        {/* TMA */}
        <div className="flex justify-between items-center text-zinc-400 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Clock size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Tempo de atendimento</span>
          </div>
          <span className="font-semibold text-zinc-200 shrink-0">
            {tmaMinutos} min
          </span>
        </div>

        {/* TME */}
        <div className="flex justify-between items-center text-zinc-400 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Clock size={15} className="text-zinc-500 shrink-0" />
            <span className="truncate">Tempo de espera</span>
          </div>
          <span className="font-semibold text-zinc-200 shrink-0">
            {tmeMinutos} min
          </span>
        </div>

      </div>

    </div>
  );
}