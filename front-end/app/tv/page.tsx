"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  distribuicaoService,
  atendimentoService,
  registroService,
  dashboardService,
  PrevisaoFila,
  DashboardMetricsResponse,
  AtendimentoModel,
  TicketUserData,
  DashboardOverview,
} from "@/services";
import { AnalistaMetricCard } from "@/components/ui/AnalistaMetricCard";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { env } from "@/lib/env";
import {
  GitFork,
  Radio,
  Zap,
  Clock,
  Headphones,
  CalendarDays,
  Maximize,
  Minimize,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  TrendingUp,
  LayoutDashboard,
  Timer,
  Settings,
  X,
} from "lucide-react";
import {
  formatarData,
  formatarHora,
  formatarDiaSemana,
  formatarHoraLocal,
  formatarDataHora,
  obterHojeStr,
} from "@/lib/dateUtils";

interface SlideInfo {
  id: number;
  title: string;
  subtitle: string;
  defaultSec: number;
}

const SLIDES_CONFIG: SlideInfo[] = [
  {
    id: 0,
    title: "Filas de Atendimento",
    subtitle: "Próximos analistas por equipe",
    defaultSec: 15,
  },
  {
    id: 1,
    title: "Atendimentos de Hoje",
    subtitle: "Volume e sincronização em tempo real",
    defaultSec: 20,
  },
  {
    id: 2,
    title: "Escala de Plantão",
    subtitle: "Plantonista atual e cronograma",
    defaultSec: 15,
  },
  {
    id: 3,
    title: "Produtividade dos Analistas",
    subtitle: "Chamados em curso, pendentes e resolvidos",
    defaultSec: 25,
  },
];

const TIME_OPTIONS = [5, 10, 15, 20, 25, 30, 45, 60];

export default function ModoTvFullscreenPage() {
  const { currentPaletteConfig } = useTheme();

  // Estado de Slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Tempos individuais para cada slide (slideId -> segundos)
  const [slideIntervals, setSlideIntervals] = useState<Record<number, number>>({
    0: 15,
    1: 20,
    2: 15,
    3: 25,
  });

  // Dados em Tempo Real
  const [previsoes, setPrevisoes] = useState<PrevisaoFila[]>([]);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [atendimentoMetrics, setAtendimentoMetrics] = useState<DashboardMetricsResponse | null>(null);
  const [ultimosAtendimentos, setUltimosAtendimentos] = useState<AtendimentoModel[]>([]);
  const [escalas, setEscalas] = useState<any[]>([]);
  const [proximoPlantao, setProximoPlantao] = useState<any | null>(null);
  const [relatorioAnalistas, setRelatorioAnalistas] = useState<TicketUserData[]>([]);
  const [sseConnected, setSseConnected] = useState(false);
  const [lastSseEvent, setLastSseEvent] = useState<string | null>(null);

  // Relógio
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  // Carregar intervalos persistidos no localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tv_slide_intervals");
      if (saved) {
        setSlideIntervals(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const salvarIntervaloSlide = (slideId: number, segundos: number) => {
    setSlideIntervals((prev) => {
      const updated = { ...prev, [slideId]: segundos };
      try {
        localStorage.setItem("tv_slide_intervals", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setProgress(0);
  };

  // Atualizar Relógio a cada segundo
  useEffect(() => {
    setCurrentTime(new Date());
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Carregar todos os dados do sistema
  const carregarDadosCompletos = useCallback(async () => {
    const hojeStr = obterHojeStr();

    try {
      const [
        filasData,
        overviewData,
        atendMetricsData,
        atendListaData,
        escalasData,
        relatorioData,
        proximoPlantaoData,
      ] = await Promise.all([
        distribuicaoService.getPrevisaoFilas().catch(() => []),
        dashboardService.getOverview().catch(() => null),
        atendimentoService.getMetrics({ dataInicio: hojeStr, dataFim: hojeStr }).catch(() => null),
        atendimentoService.list({ dataInicio: hojeStr, dataFim: hojeStr, limit: 15 }).catch(() => ({ data: [] })),
        registroService.list(1, 50).catch(() => ({ registros: [] })),
        dashboardService.getTicketsReport(hojeStr, hojeStr).catch(() => []),
        registroService.next().catch(() => null),
      ]);

      setPrevisoes(Array.isArray(filasData) ? filasData : []);
      if (overviewData) setOverview(overviewData);
      if (atendMetricsData) setAtendimentoMetrics(atendMetricsData);
      setUltimosAtendimentos(atendListaData?.data || []);
      setEscalas(escalasData?.registros || []);
      setRelatorioAnalistas(Array.isArray(relatorioData) ? relatorioData : []);
      setProximoPlantao(proximoPlantaoData);
    } catch (err) {
      console.error("Erro ao carregar dados do Modo TV:", err);
    }
  }, []);

  // Carregamento inicial
  useEffect(() => {
    carregarDadosCompletos();
  }, [carregarDadosCompletos]);

  // Conexão SSE em Tempo Real
  useEffect(() => {
    const sseUrl = `${env.NEXT_PUBLIC_API_URL}/dashboard/stream`;
    const sse = new EventSource(sseUrl, { withCredentials: true });
    eventSourceRef.current = sse;

    sse.onopen = () => {
      setSseConnected(true);
    };

    sse.addEventListener("connected", () => {
      setSseConnected(true);
    });

    sse.addEventListener("dashboard_update", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        setLastSseEvent(`${data.entity?.toUpperCase()} • ${new Date().toLocaleTimeString()}`);
        carregarDadosCompletos();
      } catch (err) {
        console.error("Erro no parse SSE:", err);
      }
    });

    sse.onerror = () => {
      setSseConnected(false);
    };

    return () => {
      sse.close();
    };
  }, [carregarDadosCompletos]);

  // Duração do slide atual
  const duracaoSlideAtual = slideIntervals[currentSlide] || SLIDES_CONFIG[currentSlide].defaultSec;

  // Timer de Rotação de Slides
  useEffect(() => {
    if (!isAutoPlay) return;

    const intervalMs = 100;
    const step = (intervalMs / (duracaoSlideAtual * 1000)) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES_CONFIG.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, duracaoSlideAtual]);

  // Alternar Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const proximoSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % SLIDES_CONFIG.length);
  };

  const slideAnterior = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + SLIDES_CONFIG.length) % SLIDES_CONFIG.length);
  };

  const irParaSlide = (index: number) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  // Plantonista ativo (endpoint /register/next)
  const plantonistaAtivo = proximoPlantao || (escalas.length > 0 ? escalas[0] : null);

  // Lista dos próximos plantões a partir de hoje
  const hojeMeiaNoite = new Date();
  hojeMeiaNoite.setHours(0, 0, 0, 0);
  const escalasFuturas = escalas.filter((item) => {
    if (!item?.data) return true;
    return new Date(item.data) >= hojeMeiaNoite;
  });
  const listaEscalasExibir = (escalasFuturas.length > 0 ? escalasFuturas : escalas).slice(0, 6);

  // Analistas com nome válido
  const analistasValidos = relatorioAnalistas.filter(
    (analista) =>
      analista &&
      analista.name &&
      analista.name.trim() !== "" &&
      analista.name.trim().toLowerCase() !== "sem nome" &&
      analista.name.trim().toLowerCase() !== "null" &&
      analista.name.trim().toLowerCase() !== "undefined"
  );

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans select-none overflow-hidden p-4 sm:p-5 lg:p-6 fixed inset-0 z-50">
      {/* 🟢 BARRA SUPERIOR / WALLBOARD HEADER */}
      <header className="flex items-center justify-between gap-4 pb-3 border-b border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl border shadow-sm transition-all"
            style={{
              backgroundColor: currentPaletteConfig.subtleBg,
              borderColor: currentPaletteConfig.subtleBorder,
              color: currentPaletteConfig.accentText,
            }}
          >
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                Alpha Escalas{" "}
                <span className="font-normal" style={{ color: currentPaletteConfig.accentText }}>
                  | Wallboard
                </span>
              </h1>
              <span
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  borderColor: currentPaletteConfig.subtleBorder,
                  color: currentPaletteConfig.accentText,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: currentPaletteConfig.primary }}
                />
                {sseConnected ? "Ao Vivo" : "Conectando"}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              <span className="font-bold" style={{ color: currentPaletteConfig.accentText }}>
                Slide {currentSlide + 1} de {SLIDES_CONFIG.length}:
              </span>{" "}
              {SLIDES_CONFIG[currentSlide].title}
            </p>
          </div>
        </div>

        {/* RELÓGIO & CONTROLES */}
        <div className="flex items-center gap-3">
          {lastSseEvent && (
            <span className="hidden 2xl:inline-block text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800">
              Sync: <span className="font-bold" style={{ color: currentPaletteConfig.accentText }}>{lastSseEvent}</span>
            </span>
          )}

          {currentTime && (
            <div className="text-right pr-3 border-r border-zinc-800 hidden sm:block">
              <p
                className="text-lg sm:text-xl font-black font-mono tracking-wider"
                style={{ color: currentPaletteConfig.accentText }}
              >
                {currentTime.toLocaleTimeString("pt-BR")}
              </p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                {currentTime.toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>
          )}

          {/* CONTROLES COMPACTOS */}
          <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl">
            <button
              onClick={slideAnterior}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-1.5 rounded-lg transition-all cursor-pointer"
              style={{
                backgroundColor: isAutoPlay ? currentPaletteConfig.subtleBg : undefined,
                color: isAutoPlay ? currentPaletteConfig.accentText : "#a1a1aa",
              }}
              title={isAutoPlay ? "Pausar" : "Iniciar"}
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={proximoSlide}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Configurar Tempos"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Tela Cheia"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <ThemeToggle />

            <Link
              href="/dashboard"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700 ml-1"
              title="Voltar ao Painel"
            >
              <LayoutDashboard className="w-3.5 h-3.5" style={{ color: currentPaletteConfig.accentText }} />
              <span className="hidden sm:inline">Painel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 🟢 BARRA DE PROGRESSO */}
      <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden my-2 relative shrink-0">
        <div
          className="h-full transition-all duration-100 ease-linear rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: currentPaletteConfig.primary,
          }}
        />
      </div>

      {/* 🟢 ÁREA DE CONTEÚDO DOS SLIDES */}
      <main className="flex-1 min-h-0 relative overflow-hidden py-1">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* ============================================================ */}
          {/* SLIDE 1: FILAS DE ATENDIMENTO */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-3 px-1 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <GitFork className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Filas de Atendimento
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Próximos analistas por equipe
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-300 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                {previsoes.length} Filas
              </span>
            </div>

            {previsoes.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-zinc-800 rounded-2xl bg-zinc-900/30">
                <p className="text-zinc-300 text-base font-bold">Nenhuma fila cadastrada</p>
                <p className="text-zinc-500 text-xs mt-1">Cadastre equipes no painel para ativar o roteamento.</p>
              </div>
            ) : (
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3.5 items-stretch min-h-0">
                {previsoes.slice(0, 4).map((p) => (
                  <div
                    key={p.equipeId}
                    className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-sm h-full"
                  >
                    {/* TOPO DO CARD */}
                    <div className="flex items-center justify-between gap-2 shrink-0">
                      <div className="min-w-0">
                        <h3 className="font-black text-lg sm:text-xl text-white truncate tracking-tight">
                          {p.equipeNome}
                        </h3>
                        <p className="text-xs text-zinc-400 truncate">
                          {p.totalMembros} membros • {p.departamentos?.join(", ") || "Todos"}
                        </p>
                      </div>
                      {p.queueId && (
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border shrink-0"
                          style={{
                            backgroundColor: currentPaletteConfig.subtleBg,
                            borderColor: currentPaletteConfig.subtleBorder,
                            color: currentPaletteConfig.accentText,
                          }}
                        >
                          #{p.queueId}
                        </span>
                      )}
                    </div>

                    {/* CORPO: PRÓXIMO ANALISTA */}
                    <div className="my-auto flex-1 flex flex-col justify-center p-3.5 sm:p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl gap-2">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                        style={{ color: currentPaletteConfig.accentText }}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Próximo da Vez:
                      </span>

                      {p.proximoDaFila ? (
                        <div className="flex items-center gap-3.5 pt-0.5">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-800 border-2 flex items-center justify-center text-base sm:text-lg font-black shrink-0 shadow-sm"
                            style={{
                              borderColor: currentPaletteConfig.subtleBorder,
                              color: currentPaletteConfig.accentText,
                            }}
                          >
                            {p.proximoDaFila.nome.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-black text-base sm:text-lg text-white truncate">
                              {p.proximoDaFila.nome}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                              {p.proximoDaFila.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-500 italic py-2 text-center">
                          Aguardando analistas online...
                        </p>
                      )}
                    </div>

                    {/* RODAPÉ DO CARD */}
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1.5 border-t border-zinc-800/80 shrink-0">
                      <span className="flex items-center gap-1 text-zinc-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" style={{ color: currentPaletteConfig.accentText }} />
                        Roteamento Inteligente
                      </span>
                      <span className="font-semibold" style={{ color: currentPaletteConfig.accentText }}>
                        ● Ativa
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* SLIDE 2: ATENDIMENTOS DE HOJE */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-3 px-1 min-h-0">
            {/* 4 CARDS PADRONIZADOS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  Chats Criados
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                  {overview?.atendimentos.hoje ?? atendimentoMetrics?.metrics.criadosHoje ?? 0}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Total: {overview?.atendimentos.totalGeral ?? 0}</p>
              </div>

              <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sincronizados
                </span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 tracking-tight">
                  {overview?.atendimentos.sincronizadosHoje ?? atendimentoMetrics?.metrics.sincronizados ?? 0}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Integrados no Helpdesk</p>
              </div>

              <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Pendentes
                </span>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 tracking-tight">
                  {overview?.atendimentos.pendentesHoje ?? atendimentoMetrics?.metrics.pendentes ?? 0}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Aguardando confirmação</p>
              </div>

              <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Taxa de Sincronia
                </span>
                <p
                  className="text-2xl sm:text-3xl font-black mt-1 tracking-tight"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  {atendimentoMetrics?.metrics.taxaSincronizacao ?? 100}%
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Eficiência operacional</p>
              </div>
            </div>

            {/* TABELA DE ATENDIMENTOS */}
            <div className="flex-1 min-h-0 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-2 shadow-xs">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5" style={{ color: currentPaletteConfig.accentText }} />
                Últimos Chats Recebidos
              </h3>

              <div className="overflow-x-auto flex-1 min-h-0">
                <table className="w-full text-left text-xs">
                  <thead className="text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800 pb-2">
                    <tr>
                      <th className="pb-2 font-semibold">Ticket</th>
                      <th className="pb-2 font-semibold">Cliente</th>
                      <th className="pb-2 font-semibold">CNPJ</th>
                      <th className="pb-2 font-semibold">Atendente</th>
                      <th className="pb-2 font-semibold">Status</th>
                      <th className="pb-2 font-semibold text-right">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {ultimosAtendimentos.slice(0, 6).map((at) => (
                      <tr key={at.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-2 font-mono font-semibold text-zinc-200">
                          {at.ticketZpro ? `#${at.ticketZpro}` : at.protocolo || "-"}
                        </td>
                        <td className="py-2 font-medium text-white truncate max-w-[200px]">
                          {at.nomeContato || "Cliente WhatsApp"}
                        </td>
                        <td className="py-2 font-mono text-zinc-400">{at.cnpj || "-"}</td>
                        <td className="py-2 font-medium text-zinc-200">{at.atendente || "Automático"}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              at.sincronizado
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                            }`}
                          >
                            {at.sincronizado ? "Sincronizado" : "Pendente"}
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono text-zinc-400 text-[11px]">
                          {formatarHoraLocal(at.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 3: ESCALA DE PLANTÃO */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-3 px-1 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Escala de Plantão
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Plantonista da vez e próximos agendados
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-300 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                {escalas.length} Plantões
              </span>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
              {/* CARD PLANTONISTA ATUAL */}
              <div className="lg:col-span-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm h-full">
                <div className="shrink-0 flex items-center justify-between">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border"
                    style={{
                      backgroundColor: currentPaletteConfig.subtleBg,
                      borderColor: currentPaletteConfig.subtleBorder,
                      color: currentPaletteConfig.accentText,
                    }}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    Plantonista Atual
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-semibold">
                    Suporte
                  </span>
                </div>

                <div className="my-auto flex flex-col items-center text-center p-4 bg-zinc-950 border border-zinc-800 rounded-xl gap-2.5">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-800 border-2 flex items-center justify-center text-xl sm:text-2xl font-black shadow-xs"
                    style={{
                      borderColor: currentPaletteConfig.subtleBorder,
                      color: currentPaletteConfig.accentText,
                    }}
                  >
                    {(plantonistaAtivo?.user?.name || plantonistaAtivo?.nome || "PL").substring(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {plantonistaAtivo?.user?.name || plantonistaAtivo?.nome || "A Definir"}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {plantonistaAtivo?.user?.email || "Plantonista Ativo no Sistema"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl shrink-0">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Data do Plantão:
                  </p>
                  <p
                    className="text-sm sm:text-base font-bold capitalize mt-0.5"
                    style={{ color: currentPaletteConfig.accentText }}
                  >
                    {plantonistaAtivo?.data
                      ? `${formatarDiaSemana(plantonistaAtivo.data)}, ${formatarData(plantonistaAtivo.data)}`
                      : "Hoje"}
                  </p>
                </div>
              </div>

              {/* LISTA DOS PRÓXIMOS */}
              <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-sm h-full">
                <div className="flex items-center justify-between shrink-0 pb-2 border-b border-zinc-800">
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" style={{ color: currentPaletteConfig.accentText }} />
                    Próximos Plantões
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">Ordem Cronológica</span>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch content-stretch min-h-0">
                  {listaEscalasExibir.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3.5 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-center justify-between gap-3 shadow-xs h-full"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-bold text-zinc-200 text-xs shrink-0">
                          #{idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm text-zinc-100 truncate">
                            {item.user?.name || "Analista"}
                          </p>
                          <p className="text-xs text-zinc-400 capitalize truncate">
                            {formatarDiaSemana(item.data, "short")}
                          </p>
                        </div>
                      </div>

                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-900 border shrink-0"
                        style={{
                          borderColor: currentPaletteConfig.subtleBorder,
                          color: currentPaletteConfig.accentText,
                        }}
                      >
                        {formatarData(item.data)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-800 shrink-0">
                  <span className="text-zinc-400">Escalas automáticas ativas</span>
                  <span className="text-zinc-500">Sincronizado com o banco de dados</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 4: PRODUTIVIDADE DOS ANALISTAS */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-3 px-1 min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Produtividade dos Analistas
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Chamados em curso, pendentes e resolvidos
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-300 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                {analistasValidos.length} Analistas
              </span>
            </div>

            {analistasValidos.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-zinc-800 rounded-2xl bg-zinc-900/30">
                <p className="text-zinc-300 text-base font-bold">Nenhuma atividade registrada hoje</p>
                <p className="text-zinc-500 text-xs mt-1">Os dados são sincronizados automaticamente em tempo real.</p>
              </div>
            ) : (
              <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 content-stretch items-stretch overflow-y-auto max-h-full pr-1">
                {analistasValidos.map((analista, idx) => (
                  <div key={analista.email || analista.name || idx} className="h-full">
                    <AnalistaMetricCard dados={analista} compact={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🟢 BARRA INFERIOR: NAVEGAÇÃO DOS SLIDES */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2.5 border-t border-zinc-800 shrink-0">
        {/* BOTÕES DE NAVEGAÇÃO */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SLIDES_CONFIG.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const tempoSlide = slideIntervals[idx] || slide.defaultSec;

            return (
              <button
                key={idx}
                onClick={() => irParaSlide(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "text-white shadow-xs"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
                style={{
                  backgroundColor: isActive ? currentPaletteConfig.primary : undefined,
                }}
              >
                <span>{idx + 1}.</span>
                <span className="truncate max-w-[170px]">{slide.title}</span>
                <span
                  className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                    isActive ? "text-white bg-black/20" : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {tempoSlide}s
                </span>
              </button>
            );
          })}
        </div>

        {/* AJUSTE RÁPIDO DE TEMPO */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">Tempo:</span>
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            {[10, 15, 20, 30, 45, 60].map((sec) => {
              const isSecSelected = duracaoSlideAtual === sec;
              return (
                <button
                  key={sec}
                  onClick={() => salvarIntervaloSlide(currentSlide, sec)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSecSelected
                      ? "text-white shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: isSecSelected ? currentPaletteConfig.primary : undefined,
                  }}
                >
                  {sec}s
                </button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* 🟢 MODAL DE CONFIGURAÇÃO DE TEMPOS */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" style={{ color: currentPaletteConfig.accentText }} />
                <h3 className="text-sm font-bold text-white">Tempo de Cada Slide</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {SLIDES_CONFIG.map((slide) => {
                const tempo = slideIntervals[slide.id] || slide.defaultSec;

                return (
                  <div key={slide.id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-xs text-white">
                        Slide {slide.id + 1}: {slide.title}
                      </p>
                      <p className="text-[11px] text-zinc-500">{slide.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <select
                        value={tempo}
                        onChange={(e) => salvarIntervaloSlide(slide.id, Number(e.target.value))}
                        className="bg-zinc-900 border border-zinc-700 font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none cursor-pointer"
                        style={{ color: currentPaletteConfig.accentText }}
                      >
                        {TIME_OPTIONS.map((sec) => (
                          <option key={sec} value={sec}>
                            {sec}s
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                style={{ backgroundColor: currentPaletteConfig.primary }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
