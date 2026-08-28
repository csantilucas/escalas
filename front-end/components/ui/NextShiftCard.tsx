// src/components/ui/NextShiftCard.tsx
"use client";

import { useEffect, useState } from "react";
import { Clock, Calendar, User } from "lucide-react";
import { registroService } from "@/services";

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


  const formatarData = (dataStr: string) => {
    return new Date(dataStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const formatarHora = (dataStr: string) => {
    return new Date(dataStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  if (loading) {
    return (
      <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl animate-pulse h-[100px] w-full flex flex-col justify-between" />
    );
  }

  if (!proximo) {
    return (
      <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl w-full flex items-center justify-center h-[100px]">
        <p className="text-xs text-zinc-500">Sem plantões ativos no momento.</p>
      </div>
    );
  }

  return (
    <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl w-full h-[100px] flex flex-col justify-between select-none font-sans antialiased text-left">
      
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Próximo analista ativo
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="Próximo na fila" />
      </div>

      {/* Conteúdo Central: Informações do Analista */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/60 text-zinc-300">
          <User size={14} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-zinc-200 truncate">
            {proximo.user?.name || "Não atribuído"}
          </span>
          <span className="text-[11px] text-zinc-500 truncate">
            {proximo.user?.email || "—"}
          </span>
        </div>
      </div>

      {/* Rodapé: Informações da Escala */}
      <div className="flex gap-4 pt-1.5 border-t border-zinc-800/80 text-xs text-zinc-400 font-medium">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-zinc-500" />
          <span>{formatarData(proximo.data)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-zinc-500" />
          <span>{`${formatarHora(proximo.startTime)} - ${formatarHora(proximo.endTime)}`}</span>
        </div>
      </div>

    </div>
  );
}