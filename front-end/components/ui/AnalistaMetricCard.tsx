import { TicketUserData } from "@/services";
import { useTheme } from "@/contexts/ThemeContext";
import { User, MessageSquare, Clock, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";

interface AnalistaMetricCardProps {
  dados: TicketUserData;
  compact?: boolean;
}

export function AnalistaMetricCard({ dados, compact = false }: AnalistaMetricCardProps) {
  const { currentPaletteConfig } = useTheme();
  const tmaMinutos = dados.tma?.minutes ?? 0;
  const tmeMinutos = dados.tme?.minutes ?? 0;

  if (compact) {
    return (
      <div className="w-full h-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 shadow-md select-none font-sans antialiased text-left transition-all hover:border-zinc-700">
        {/* Cabeçalho Compacto: Somente Nome */}
        <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3 shrink-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-800 border rounded-xl flex items-center justify-center text-sm sm:text-base font-black shrink-0 shadow-xs"
            style={{
              borderColor: currentPaletteConfig.subtleBorder,
              color: currentPaletteConfig.accentText,
            }}
          >
            {(dados.name || "A").substring(0, 2).toUpperCase()}
          </div>
          <span className="text-base sm:text-lg font-black text-zinc-100 truncate flex-1 tracking-tight" title={dados.name || ""}>
            {dados.name || "Sem Nome"}
          </span>
        </div>

        {/* 3 Cards de Status: Em curso, Pendentes, Resolvidos */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-1 items-stretch">
          {/* Em Atendimento / Em Curso */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/80 border border-amber-500/30 p-2.5 sm:p-3 rounded-xl text-center shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Em curso</span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400 mt-1">
              {dados.qtd_em_atendimento || "0"}
            </span>
          </div>

          {/* Pendentes */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/80 border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-center shadow-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MessageSquare className="w-3.5 h-3.5 shrink-0 text-blue-400" />
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Pendente</span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-100 mt-1">
              {dados.qtd_pendentes || "0"}
            </span>
          </div>

          {/* Resolvidos */}
          <div className="flex flex-col justify-between items-center bg-zinc-950/80 border border-emerald-500/30 p-2.5 sm:p-3 rounded-xl text-center shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Resolvido</span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 mt-1">
              {dados.qtd_resolvidos || "0"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between gap-3.5 shadow-xs select-none font-sans antialiased text-left">
      
      {/* Container Superior (Info + Grid de Contadores) */}
      <div className="flex flex-col gap-3">
        {/* Cabeçalho: Nome e Informações do Analista */}
        <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2.5">
          <div className="p-1.5 bg-zinc-800 border border-zinc-700/60 rounded-md text-zinc-300 shrink-0">
            <User size={15} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-zinc-100 truncate">
              {dados.name || "Sem Nome"}
            </span>
            <span className="text-[11px] text-zinc-500 truncate">
              {dados.email || "Sem e-mail cadastrado"}
            </span>
          </div>
        </div>

        {/* Grid Principal: Métricas de Chamados */}
        <div className="grid grid-cols-3 gap-2">
          
          {/* Em Atendimento */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2 rounded-md text-center min-h-[58px]">
            <div className="flex items-center gap-1 text-amber-400">
              <AlertCircle size={11} className="shrink-0" />
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Em curso</span>
            </div>
            <span className="text-base font-bold text-amber-400 mt-0.5">
              {dados.qtd_em_atendimento || "0"}
            </span>
          </div>

          {/* Pendentes */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2 rounded-md text-center min-h-[58px]">
            <div className="flex items-center gap-1 text-zinc-400">
              <MessageSquare size={11} className="shrink-0" />
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Pendentes</span>
            </div>
            <span className="text-base font-bold text-zinc-200 mt-0.5">
              {dados.qtd_pendentes || "0"}
            </span>
          </div>

          {/* Resolvidos */}
          <div className="flex flex-col justify-between items-center bg-zinc-900/60 border border-zinc-800 p-2 rounded-md text-center min-h-[58px]">
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={11} className="shrink-0" />
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Resolvidos</span>
            </div>
            <span className="text-base font-bold text-emerald-400 mt-0.5">
              {dados.qtd_resolvidos || "0"}
            </span>
          </div>

        </div>
      </div>

      {/* Rodapé: Tempos Médios e Produtividade Total */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-md p-2.5 flex flex-col gap-2 text-xs mt-auto">
        
        {/* Total Acumulado */}
        <div className="flex justify-between items-center text-zinc-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <BarChart3 size={13} className="text-zinc-500 shrink-0" />
            <span className="truncate text-[11px]">Volume total</span>
          </div>
          <span className="font-semibold text-zinc-200 text-xs">
            {dados.qtd_por_usuario || "0"}
          </span>
        </div>

        {/* TMA */}
        <div className="flex justify-between items-center text-zinc-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock size={13} className="text-zinc-500 shrink-0" />
            <span className="truncate text-[11px]">Tempo médio atendimento</span>
          </div>
          <span className="font-semibold text-zinc-200 text-xs">
            {tmaMinutos} min
          </span>
        </div>

        {/* TME */}
        <div className="flex justify-between items-center text-zinc-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock size={13} className="text-zinc-500 shrink-0" />
            <span className="truncate text-[11px]">Tempo médio espera</span>
          </div>
          <span className="font-semibold text-zinc-200 text-xs">
            {tmeMinutos} min
          </span>
        </div>

      </div>

    </div>
  );
}