import { TicketUserData } from "@/services";
import { useTheme } from "@/contexts/ThemeContext";
import { MessageSquare, CheckCircle2 } from "lucide-react";

interface AnalistaMetricCardProps {
  dados: TicketUserData;
  compact?: boolean;
}

export function AnalistaMetricCard({ dados, compact = false }: AnalistaMetricCardProps) {
  const { currentPaletteConfig } = useTheme();
  const initials = (dados.name || "AN").trim().substring(0, 2).toUpperCase();

  if (compact) {
    return (
      <div className="w-full h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-2.5 sm:p-3 2xl:p-4 flex flex-col justify-between gap-1.5 sm:gap-2 shadow-md select-none font-sans text-left transition-all hover:border-zinc-700 min-h-0 overflow-hidden">
        {/* Cabeçalho Modo TV: Avatar + Nome em destaque */}
        <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-1.5 shrink-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm lg:text-base font-black shrink-0 shadow-xs"
            style={{
              backgroundColor: currentPaletteConfig.subtleBg,
              borderColor: currentPaletteConfig.subtleBorder,
              color: currentPaletteConfig.accentText,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className="text-sm sm:text-base lg:text-lg font-black text-white truncate tracking-tight leading-tight"
              title={dados.name || ""}
            >
              {dados.name || "Analista"}
            </h4>
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate leading-none mt-0.5 font-medium">
              {dados.email || "Atendimento Helpdesk"}
            </p>
          </div>
        </div>

        {/* 2 Cards de Status: Pendentes e Resolvidos */}
        <div className="grid grid-cols-2 gap-2 flex-1 items-stretch min-w-0 my-0.5">
          {/* Pendentes */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/90 border border-amber-500/30 p-2 rounded-xl text-center shadow-xs min-w-0">
            <div className="flex items-center gap-1.5 text-amber-400 min-w-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-400" />
              <span className="text-[10px] sm:text-xs 2xl:text-sm font-black text-amber-400 uppercase tracking-wider truncate">
                Pendente
              </span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-black text-amber-400 mt-1 truncate w-full leading-tight">
              {dados.qtd_pendentes || "0"}
            </span>
          </div>

          {/* Resolvidos */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/90 border border-emerald-500/30 p-2 rounded-xl text-center shadow-xs min-w-0">
            <div className="flex items-center gap-1.5 text-emerald-400 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-400" />
              <span className="text-[10px] sm:text-xs 2xl:text-sm font-black text-emerald-400 uppercase tracking-wider truncate">
                Resolvido
              </span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-black text-emerald-400 mt-1 truncate w-full leading-tight">
              {dados.qtd_resolvidos || "0"}
            </span>
          </div>
        </div>

        {/* Rodapé: Total de Atendimentos */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px] sm:text-xs text-zinc-400 shrink-0 font-medium">
          <span className="text-zinc-400">
            Total de Chamados
          </span>
          <span className="font-black text-white text-xs sm:text-sm">{dados.qtd_por_usuario || "0"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900/50 border border-zinc-800/90 rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-xs select-none font-sans antialiased text-left transition-all hover:border-zinc-700">
      {/* Container Superior (Info + Grid de Contadores) */}
      <div className="flex flex-col gap-3">
        {/* Cabeçalho: Nome e Informações do Analista */}
        <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-2.5">
          <div
            className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              backgroundColor: currentPaletteConfig.subtleBg,
              borderColor: currentPaletteConfig.subtleBorder,
              color: currentPaletteConfig.accentText,
            }}
          >
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-zinc-100 truncate" title={dados.name || ""}>
              {dados.name || "Sem Nome"}
            </span>
            <span className="text-[11px] text-zinc-500 truncate" title={dados.email || ""}>
              {dados.email || "Sem e-mail cadastrado"}
            </span>
          </div>
        </div>

        {/* Grid Principal: 2 Métricas de Chamados (Pendente e Resolvido) */}
        <div className="grid grid-cols-2 gap-2.5 min-w-0">
          {/* Pendentes */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/80 border border-amber-500/25 p-2.5 rounded-lg text-center min-w-0">
            <div className="flex items-center gap-1.5 text-amber-400 min-w-0">
              <MessageSquare className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide truncate">
                Pendente
              </span>
            </div>
            <span className="text-lg sm:text-xl font-black text-amber-400 mt-1">
              {dados.qtd_pendentes || "0"}
            </span>
          </div>

          {/* Resolvidos */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/80 border border-emerald-500/25 p-2.5 rounded-lg text-center min-w-0">
            <div className="flex items-center gap-1.5 text-emerald-400 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide truncate">
                Resolvido
              </span>
            </div>
            <span className="text-lg sm:text-xl font-black text-emerald-400 mt-1">
              {dados.qtd_resolvidos || "0"}
            </span>
          </div>
        </div>
      </div>

      {/* Rodapé: Total de Atendimentos */}
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg px-2.5 py-2 flex items-center justify-between text-xs text-zinc-400 mt-auto">
        <span className="text-zinc-400 font-medium">
          Total de Chamados
        </span>
        <strong className="text-white font-bold text-sm">{dados.qtd_por_usuario || "0"}</strong>
      </div>
    </div>
  );
}