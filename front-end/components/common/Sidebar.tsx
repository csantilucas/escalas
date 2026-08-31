"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
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
  Tv,
  Palette,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Verificação de permissões resiliente
  const role = String(user?.role || user?.typeUser || "").toLowerCase();
  const isAdmin = role === "admin" || user?.role === "admin" || user?.typeUser === "admin";
  const isGestor = role === "gestor" || user?.role === "gestor" || user?.typeUser === "gestor";
  const isAtendente = user?.typeUser === "atendente";

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
    { label: "Modo TV Wallboard", href: "/tv", icon: Tv, show: true, badge: "Live" },
    { label: "Minha Escala", href: "/perfil", icon: User, show: true },
    { label: "Distribuição & Filas", href: "/distribuicao", icon: GitFork, show: true, badge: "Live" },
    { label: "Equipes & Turnos", href: "/equipes", icon: Users2, show: true },
    { label: "Atendimentos", href: "/atendimentos", icon: Headphones, show: true },
    { label: "Plantonistas & Escalas", href: "/plantonistas", icon: CalendarDays, show: true },
    { label: "Relatórios & Impressão", href: "/relatorios-escalas", icon: FileText, show: true },
    { label: "Tomticket", href: "/tomticket", icon: FileSpreadsheet, show: isAdmin || isGestor },
    { label: "Logs & Auditoria", href: "/logs", icon: Activity, show: isAdmin, badge: "Live" },
    { label: "Usuários", href: "/usuarios", icon: UserCheck, show: isAdmin },
    { label: "Tokens de API", href: "/tokens", icon: KeyRound, show: isAdmin },
    { label: "Paleta de Cores", href: "/paletas", icon: Palette, show: isAdmin, badge: "Novo" },
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
          "w-64 h-screen bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between p-4 select-none font-sans antialiased shrink-0 z-40 transition-transform duration-200 ease-out",
          "fixed inset-y-0 left-0 -translate-x-full md:relative md:translate-x-0",
          isOpen && "translate-x-0"
        )}
      >
        <div className="flex flex-col gap-6">
          {/* HEADER DA SIDEBAR */}
          <div className="px-3 pt-4 md:pt-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
                  <Radio className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <h1 className="text-sm font-bold text-zinc-100 tracking-tight">Alpha Escalas</h1>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 pl-9">Gestão & Distribuição</p>
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
                      "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group border border-transparent",
                      isActive
                        ? "bg-zinc-800 text-zinc-100 border-zinc-700/80 font-semibold shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
          </nav>
        </div>

        {/* PERFIL E LOGOUT */}
        <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/80 px-2">
          {/* Alternador de Tema */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-zinc-400">Aparência</span>
            <ThemeToggle showLabel />
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <div className="w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-bold text-zinc-200 uppercase shrink-0">
              {user?.name ? user.name.substring(0, 2) : "US"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-zinc-200 truncate">
                {user?.name || "Usuário"}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium truncate">
                {isAdmin ? (
                  <span className="text-rose-400 font-medium">
                    Admin {isAtendente ? "• Atendente" : "• Geral"}
                  </span>
                ) : isGestor ? (
                  <span className="text-amber-400 font-medium">
                    Gestor {isAtendente ? "• Atendente" : "• Geral"}
                  </span>
                ) : isAtendente ? (
                  <span className="text-cyan-400 font-medium">Atendente</span>
                ) : (
                  <span>Usuário Comum</span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  );
}