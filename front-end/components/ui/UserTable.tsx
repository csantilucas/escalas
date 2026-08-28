// src/components/ui/UserTable.tsx
"use client";

import { UserItem } from "@/services";

interface UserTableProps {
  usuarios: UserItem[];
  isLoading: boolean;
}

export function UserTable({ usuarios, isLoading }: UserTableProps) {
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
      <div className="text-center p-8 bg-zinc-900/30 border border-zinc-850 rounded-xl">
        <p className="text-sm text-zinc-500">Nenhum usuário cadastrado no sistema.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-900/40 font-sans antialiased">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-semibold select-none">
            <th className="px-5 py-3 font-semibold text-xs text-zinc-300">Nome & E-mail</th>
            <th className="px-5 py-3 font-semibold text-center text-xs text-zinc-300">Nível de Acesso</th>
            <th className="px-5 py-3 font-semibold text-center text-xs text-zinc-300">Tipo de Usuário</th>
            <th className="px-5 py-3 font-semibold text-center text-xs text-zinc-300">Plantonista & Fila</th>
            <th className="px-5 py-3 font-medium text-center text-xs text-zinc-400">ID Atendente (Z-PRO)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
          {usuarios.map((usr) => {
            const isAdmin = usr.role === "admin" || usr.typeUser === "admin";
            const isAtendente = usr.typeUser === "atendente";

            return (
              <tr key={usr.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-bold text-zinc-200 uppercase">
                      {usr.name ? usr.name.substring(0, 2) : "US"}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-100">{usr.name}</span>
                      <span className="text-xs text-zinc-400 font-mono">{usr.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                      isAdmin
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        : "bg-zinc-800/60 text-zinc-400 border-zinc-700/60"
                    }`}
                  >
                    {isAdmin ? "Administrador" : "Usuário Comum"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                      isAtendente
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : "bg-zinc-800/40 text-zinc-400 border-zinc-700/40"
                    }`}
                  >
                    {isAtendente ? "Atendente" : "Comum"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-center">
                  {usr.isPlantonista ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      ⚡ Fila #{usr.posicao ?? 0}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-center text-zinc-400 font-mono text-xs">
                  {usr.id_atendente ? (
                    <span className="text-cyan-400 font-semibold">{usr.id_atendente}</span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}