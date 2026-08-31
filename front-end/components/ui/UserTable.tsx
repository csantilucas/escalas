// src/components/ui/UserTable.tsx
"use client";

import { UserItem } from "@/services";
import { Edit2, Trash2 } from "lucide-react";

interface UserTableProps {
  usuarios: UserItem[];
  isLoading: boolean;
  onEditClick?: (user: UserItem) => void;
  onDeleteClick?: (user: UserItem) => void;
}

export function UserTable({ usuarios, isLoading, onEditClick, onDeleteClick }: UserTableProps) {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-11 bg-zinc-800/40 border border-zinc-800/80 rounded-lg w-full" />
        ))}
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="text-center p-8 bg-zinc-900/30 border border-zinc-800 rounded-lg">
        <p className="text-xs font-medium text-zinc-500">Nenhum usuário cadastrado no sistema.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 font-sans antialiased shadow-xs">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/70 text-zinc-400 font-semibold select-none">
            <th className="px-4 py-2.5 font-semibold text-[11px] uppercase tracking-wider text-zinc-300">Nome & E-mail</th>
            <th className="px-4 py-2.5 font-semibold text-center text-[11px] uppercase tracking-wider text-zinc-300">Acesso</th>
            <th className="px-4 py-2.5 font-semibold text-center text-[11px] uppercase tracking-wider text-zinc-300">Tipo</th>
            <th className="px-4 py-2.5 font-semibold text-center text-[11px] uppercase tracking-wider text-zinc-300">Fila Plantão</th>
            <th className="px-4 py-2.5 font-medium text-center text-[11px] uppercase tracking-wider text-zinc-400">ID Z-PRO</th>
            {(onEditClick || onDeleteClick) && (
              <th className="px-4 py-2.5 font-semibold text-right text-[11px] uppercase tracking-wider text-zinc-300">Ações</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
          {usuarios.map((usr) => {
            const role = String(usr.role || usr.typeUser || "").toLowerCase();
            const isAdmin = role === "admin";
            const isGestor = role === "gestor";
            const isAtendente = usr.typeUser === "atendente";

            return (
              <tr key={usr.id} className="hover:bg-zinc-800/30 transition-colors duration-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-[11px] font-bold text-zinc-200 uppercase shrink-0">
                      {usr.name ? usr.name.substring(0, 2) : "US"}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-zinc-100 truncate">{usr.name}</span>
                      <span className="text-[11px] text-zinc-400 font-mono truncate">{usr.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium border capitalize ${
                      isAdmin
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20 font-semibold"
                        : isGestor
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20 font-semibold"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700/60"
                    }`}
                  >
                    {isAdmin ? "Admin" : isGestor ? "Gestor" : "Comum"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium border capitalize ${
                      isAtendente
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20 font-semibold"
                        : "bg-zinc-800/60 text-zinc-400 border-zinc-700/40"
                    }`}
                  >
                    {isAtendente ? "Atendente" : "Comum"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {usr.isPlantonista ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Fila #{usr.posicao ?? 0}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-zinc-400 font-mono text-xs">
                  {usr.id_atendente ? (
                    <span className="text-zinc-200 font-semibold">{usr.id_atendente}</span>
                  ) : (
                    "—"
                  )}
                </td>
                {(onEditClick || onDeleteClick) && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {onEditClick && (
                        <button
                          onClick={() => onEditClick(usr)}
                          className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-md transition-colors cursor-pointer"
                          title="Editar Usuário"
                        >
                          <Edit2 size={13} />
                        </button>
                      )}
                      {onDeleteClick && (
                        <button
                          onClick={() => onDeleteClick(usr)}
                          className="p-1 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-md transition-colors cursor-pointer"
                          title="Excluir Usuário"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}