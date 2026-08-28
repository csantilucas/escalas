"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GitFork,
  Users2,
  Headphones,
  CalendarDays,
  UserCheck,
  KeyRound,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  Radio,
  User,
  Activity,
  FileText,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Verificação de permissões resiliente
  const isAdmin =
    user?.role === "admin" ||
    user?.typeUser === "admin" ||
    user?.role?.toLowerCase() === "admin" ||
    user?.typeUser?.toLowerCase() === "admin";

  const isAtendente = user?.typeUser === "atendente";

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
    { label: "Minha Escala", href: "/perfil", icon: User, show: true },
    { label: "Distribuição & Filas", href: "/distribuicao", icon: GitFork, show: true, badge: "Live" },
    { label: "Equipes & Turnos", href: "/equipes", icon: Users2, show: isAdmin },
    { label: "Atendimentos", href: "/atendimentos", icon: Headphones, show: true },
    { label: "Plantonistas & Escalas", href: "/plantonistas", icon: CalendarDays, show: isAdmin },
    { label: "Relatórios & Impressão", href: "/relatorios-escalas", icon: FileText, show: isAdmin },
    { label: "Logs & Auditoria", href: "/logs", icon: Activity, show: isAdmin, badge: "Live" },
    { label: "Usuários", href: "/usuarios", icon: UserCheck, show: isAdmin },
    { label: "Tokens de API", href: "/tokens", icon: KeyRound, show: isAdmin },
    { label: "Tomticket", href: "/tomticket", icon: FileSpreadsheet, show: isAdmin },
  ];

  return (
    <>
      {/* BOTÃO DE MENU (Apenas visível no Celular) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-zinc-100 transition-all active:scale-95 shadow-lg"
          aria-label="Abrir Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR RESPONSIVA */}
      <aside
        className={cn(
          "w-64 h-screen bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-800/60 flex flex-col justify-between p-4 select-none font-sans antialiased shrink-0 z-40 transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 -translate-x-full md:relative md:translate-x-0",
          isOpen && "translate-x-0"
        )}
      >
        <div className="flex flex-col gap-6">
          {/* HEADER DA SIDEBAR */}
          <div className="px-3 pt-6 md:pt-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <h1 className="text-base font-bold text-zinc-100 tracking-tight">Alpha Escalas</h1>
              </div>
              <p className="text-xs text-zinc-500 mt-1 pl-9">Gestão & Distribuição</p>
            </div>
          </div>

          {/* NAVEGAÇÃO */}
          <nav className="flex flex-col gap-1">
            {menuItems
              .filter((item) => item.show)
              .map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group border border-transparent",
                      isActive
                        ? "bg-zinc-800/80 text-zinc-100 border-zinc-700/60 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
          </nav>
        </div>

        {/* PERFIL E LOGOUT */}
        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/60 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-sm font-bold text-zinc-200 uppercase shrink-0">
              {user?.name ? user.name.substring(0, 2) : "US"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-zinc-200 truncate">
                {user?.name || "Usuário"}
              </span>
              <span className="text-xs text-zinc-400 font-medium truncate">
                {isAdmin ? (
                  <span className="text-rose-400 font-semibold">
                    Admin {isAtendente ? "• Atendente" : "• Comum"}
                  </span>
                ) : isAtendente ? (
                  <span className="text-cyan-400 font-semibold">Atendente</span>
                ) : (
                  <span>Usuário Comum</span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-400/90 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
}