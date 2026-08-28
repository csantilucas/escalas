// src/components/ui/UserTable.tsx
"use client";

interface Usuario {
  id: string;
  name: string;
  email: string;
  typeUser: string;
  id_atendente?: string;
}

interface UserTableProps {
  usuarios: Usuario[];
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
            <th className="px-5 py-3 font-semibold text-xs text-zinc-300">Nome</th>
            <th className="px-5 py-3 font-medium text-xs text-zinc-400">E-mail</th>
            <th className="px-5 py-3 font-semibold text-center text-xs text-zinc-300">Nível de acesso</th>
            <th className="px-5 py-3 font-medium text-center text-xs text-zinc-400">ID atendente</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
          {usuarios.map((usr) => (
            <tr key={usr.id} className="hover:bg-zinc-800/30 transition-colors">
              <td className="px-5 py-3.5 font-semibold text-zinc-100">{usr.name}</td>
              <td className="px-5 py-3.5 text-zinc-400 font-medium">{usr.email}</td>
              <td className="px-5 py-3.5 text-center">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border capitalize ${
                    usr.typeUser === "admin"
                      ? "bg-zinc-800/60 text-zinc-200 border-zinc-700/80"
                      : "bg-zinc-900/40 text-zinc-500 border-zinc-800/80"
                  }`}
                >
                  {usr.typeUser}
                </span>
              </td>
              <td className="px-5 py-3.5 text-center text-zinc-400 font-medium">
                {usr.id_atendente || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}