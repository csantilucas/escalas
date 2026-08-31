// src/components/ui/EscalaTable.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { formatarData, formatarHora, formatarDiaSemana } from "@/lib/dateUtils";

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
      <div className="text-center p-8 bg-zinc-900/30 border border-zinc-800 rounded-lg">
        <p className="text-xs font-medium text-zinc-500">Nenhum registro de escala cadastrado para exibição.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 font-sans antialiased shadow-xs">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/70 text-zinc-400 font-semibold select-none">
            <th className="px-4 py-2.5 font-semibold text-[11px] uppercase tracking-wider text-zinc-300">Plantonista</th>
            <th className="px-4 py-2.5 font-medium text-[11px] uppercase tracking-wider text-zinc-400">Atendente original</th>
            <th className="px-4 py-2.5 font-semibold text-center text-[11px] uppercase tracking-wider text-zinc-300">Data</th>
            <th className="px-4 py-2.5 font-medium text-center text-[11px] uppercase tracking-wider text-zinc-400">Horário</th>
            {isAdmin && <th className="px-4 py-2.5 font-medium text-right pr-5 text-[11px] uppercase tracking-wider text-zinc-400">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
          {registros.map((registro) => (
            <tr 
              key={registro.id} 
              className="hover:bg-zinc-800/30 transition-colors duration-100"
            >
              <td className="px-4 py-3 font-semibold text-zinc-100">
                {registro.user?.name || "Não atribuído"}
              </td>
              
              <td className="px-4 py-3 text-zinc-400 font-medium">
                {registro.plantao?.nome || "Não informado"}
              </td>
              
              <td className="px-4 py-3 text-center">
                <span className="bg-zinc-800 border border-zinc-700/60 text-zinc-200 px-2.5 py-0.5 rounded-md font-medium text-xs inline-block">
                  {formatarData(registro.data)}
                </span>
              </td>
              
              <td className="px-4 py-3 text-center text-zinc-300 font-medium">
                {`${formatarHora(registro.startTime)} - ${formatarHora(registro.endTime)}`}
              </td>
              
              {isAdmin && (
                <td className="px-4 py-3 text-right pr-5">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => onEditClick && onEditClick(registro)}
                      className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-all inline-flex items-center justify-center cursor-pointer"
                      title="Editar escala"
                    >
                      <Pencil size={13} />
                    </button>

                    <button
                      onClick={() => onDeleteClick && onDeleteClick(registro)}
                      className="p-1 hover:bg-red-500/10 rounded-md text-zinc-400 hover:text-red-400 transition-all inline-flex items-center justify-center cursor-pointer"
                      title="Excluir escala"
                    >
                      <Trash2 size={13} />
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