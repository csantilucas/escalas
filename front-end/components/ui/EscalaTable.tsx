// src/components/ui/EscalaTable.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RegistroEscala {
  id: string;
  plantao_id: string;
  user_id: string;
  data: string;
  startTime: string;
  endTime: string;
  plantao?: {
    nome: string;
  };
  user?: {
    name: string;
  };
}

interface EscalaTableProps {
  registros: RegistroEscala[];
  isAdmin?: boolean;
  onEditClick?: (registro: RegistroEscala) => void;
  onDeleteClick?: (registro: RegistroEscala) => void;
  isLoading?: boolean;
}

export function EscalaTable({ 
  registros, 
  isAdmin = false, 
  onEditClick, 
  onDeleteClick, 
  isLoading = false 
}: EscalaTableProps) {
  
  const formatarData = (dataStr: string) => {
    if (!dataStr) return "-";
    return new Date(dataStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC"
    });
  };

  const formatarHora = (dataStr: string) => {
    if (!dataStr) return "-";
    return new Date(dataStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    });
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-11 bg-zinc-800/40 border border-zinc-800/80 rounded-lg w-full" />
        ))}
      </div>
    );
  }

  if (!registros || registros.length === 0) {
    return (
      <div className="text-center p-8 bg-zinc-900/30 border border-zinc-850 rounded-xl">
        <p className="text-sm text-zinc-500">Nenhum registro de escala encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-900/40 font-sans antialiased">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-semibold select-none">
            <th className="px-5 py-3 font-semibold text-xs text-zinc-300">Plantonista</th>
            <th className="px-5 py-3 font-medium text-xs text-zinc-400">Atendente original</th>
            <th className="px-5 py-3 font-semibold text-center text-xs text-zinc-300">Data</th>
            <th className="px-5 py-3 font-medium text-center text-xs text-zinc-400">Horário</th>
            {isAdmin && <th className="px-5 py-3 font-medium text-right pr-6 text-xs text-zinc-400">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
          {registros.map((registro) => (
            <tr 
              key={registro.id} 
              className="hover:bg-zinc-800/30 transition-colors"
            >
              <td className="px-5 py-3.5 font-semibold text-zinc-100">
                {registro.user?.name || "Não atribuído"}
              </td>
              
              <td className="px-5 py-3.5 text-zinc-400 font-medium">
                {registro.plantao?.nome || "Não informado"}
              </td>
              
              <td className="px-5 py-3.5 text-center">
                {/* 🟢 TAG DE DATA: Ajustado o padding e tamanho da fonte arredondada sem mono/black */}
                <span className="bg-zinc-800 border border-zinc-700/80 text-zinc-100 px-3 py-1 rounded-lg font-medium text-xs shadow-sm inline-block">
                  {formatarData(registro.data)}
                </span>
              </td>
              
              <td className="px-5 py-3.5 text-center text-zinc-300 font-medium">
                {`${formatarHora(registro.startTime)} - ${formatarHora(registro.endTime)}`}
              </td>
              
              {isAdmin && (
                <td className="px-5 py-3.5 text-right pr-6">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => onEditClick && onEditClick(registro)}
                      className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-200 transition-all inline-flex items-center justify-center active:scale-95"
                      title="Editar escala"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() => onDeleteClick && onDeleteClick(registro)}
                      className="p-1.5 hover:bg-red-950/30 rounded-md text-zinc-500 hover:text-red-400 transition-all inline-flex items-center justify-center active:scale-95"
                      title="Excluir escala"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}