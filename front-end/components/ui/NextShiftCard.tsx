// src/components/ui/NextShiftCard.tsx
"use client";

import { useEffect, useState } from "react";
import { Clock, Calendar, User } from "lucide-react";
import { registroService } from "@/services";

import { formatarData, formatarHora } from "@/lib/dateUtils";

interface NextShiftData {
  id: string;
  data: string;
  startTime: string;
  endTime: string;
  user?: {
    name: string;
    email: string;
  };
}

export function NextShiftCard() {
  const [proximo, setProximo] = useState<NextShiftData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProximo() {
      try {
        setLoading(true);
        const data = await registroService.next();
        setProximo(data);
      } catch (error) {
        console.error("Erro ao buscar próximo plantão ativo:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProximo();
  }, []);

  if (loading) {
    return (
      <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg animate-pulse h-[90px] w-full flex flex-col justify-between" />
    );
  }

  if (!proximo) {
    return (
      <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg w-full flex items-center justify-center h-[90px]">
        <p className="text-xs font-medium text-zinc-500">Sem plantões ativos no momento.</p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg w-full h-[90px] flex flex-col justify-between select-none font-sans antialiased text-left shadow-xs">
      
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
          Próximo analista ativo
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Próximo na fila" />
      </div>

      {/* Conteúdo Central: Informações do Analista */}
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-md bg-zinc-800 border border-zinc-700/60 text-zinc-300">
          <User size={13} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-zinc-100 truncate">
            {proximo.user?.name || "Não atribuído"}
          </span>
          <span className="text-[10px] text-zinc-500 truncate">
            {proximo.user?.email || "—"}
          </span>
        </div>
      </div>

      {/* Rodapé: Informações da Escala */}
      <div className="flex gap-3 pt-1 border-t border-zinc-800/60 text-[11px] text-zinc-400 font-medium">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-zinc-500" />
          <span>{formatarData(proximo.data)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-zinc-500" />
          <span>{`${formatarHora(proximo.startTime)} - ${formatarHora(proximo.endTime)}`}</span>
        </div>
      </div>

    </div>
  );
}