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

  // Rolagem automática da tabela de atendimentos
  const [isTableAutoScroll, setIsTableAutoScroll] = useState(true);

  const eventSourceRef = useRef<EventSource | null>(null);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll suave para a tabela de atendimentos no Modo TV
  useEffect(() => {
    if (currentSlide !== 1 || !isTableAutoScroll) return; // Slide 2 (id 1: Atendimentos de Hoje)
    const el = tableScrollRef.current;
    if (!el) return;

    el.scrollTop = 0;
    let isPaused = false;

    const scrollInterval = setInterval(() => {
      if (isPaused) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      if (el.scrollTop >= maxScroll - 2) {
        isPaused = true;
        setTimeout(() => {
          el.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isPaused = false;
          }, 1800);
        }, 2500);
      } else {
        el.scrollTop += 1;
      }
    }, 35);

    return () => clearInterval(scrollInterval);
  }, [currentSlide, ultimosAtendimentos, isTableAutoScroll]);

  // Carregar intervalos persistidos no localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tv_slide_intervals");
      if (saved) {
        setSlideIntervals(JSON.parse(saved));
      }
    } catch { }
  }, []);

  const salvarIntervaloSlide = (slideId: number, segundos: number) => {
    setSlideIntervals((prev) => {
      const updated = { ...prev, [slideId]: segundos };
      try {
        localStorage.setItem("tv_slide_intervals", JSON.stringify(updated));
      } catch { }
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
        atendimentoService.list({ limit: 50 }).catch(() => ({ data: [] })),
        registroService.list(1, 50).catch(() => ({ registros: [] })),
        atendimentoService.getProdutividade(hojeStr, hojeStr).catch(() => []),
        registroService.next().catch(() => null),
      ]);

      setPrevisoes(Array.isArray(filasData) ? filasData : []);
      if (overviewData) setOverview(overviewData);
      if (atendMetricsData) setAtendimentoMetrics(atendMetricsData);
      const listaAtend = atendListaData?.data || (Array.isArray(atendListaData) ? atendListaData : []);
      setUltimosAtendimentos(listaAtend);
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
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
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
    <div className="tv-container h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans select-none overflow-hidden p-1.5 sm:p-2.5 md:p-3 2xl:p-5 fixed inset-0 z-50">
      {/* 🟢 BARRA SUPERIOR / WALLBOARD HEADER */}
      <header className="flex items-center justify-between gap-2 pb-1.5 sm:pb-2 border-b border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="p-1.5 sm:p-2 2xl:p-2.5 rounded-xl border shadow-xs transition-all shrink-0"
            style={{
              backgroundColor: currentPaletteConfig.subtleBg,
              borderColor: currentPaletteConfig.subtleBorder,
              color: currentPaletteConfig.accentText,
            }}
          >
            <Radio className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-black tracking-tight text-white truncate">
                Alpha Escalas
              </h1>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase border shrink-0"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  borderColor: currentPaletteConfig.subtleBorder,
                  color: currentPaletteConfig.accentText,
                }}
              >
                <span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-ping"
                  style={{ backgroundColor: currentPaletteConfig.primary }}
                />
                {sseConnected ? "Ao Vivo" : "Conectando"}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate max-w-[240px] sm:max-w-none">
              <span className="font-extrabold" style={{ color: currentPaletteConfig.accentText }}>
                Slide {currentSlide + 1}/{SLIDES_CONFIG.length}:
              </span>{" "}
              {SLIDES_CONFIG[currentSlide].title}
            </p>
          </div>
        </div>

        {/* RELÓGIO & CONTROLES */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 2xl:gap-3 shrink-0">
          {lastSseEvent && (
            <span className="hidden 2xl:inline-block text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              Sync: <span className="font-bold" style={{ color: currentPaletteConfig.accentText }}>{lastSseEvent}</span>
            </span>
          )}

          {currentTime && (
            <div className="text-right pr-2 sm:pr-3 border-r border-zinc-800 hidden sm:block">
              <p
                className="text-lg sm:text-xl lg:text-2xl font-black font-mono tracking-wider leading-none"
                style={{ color: currentPaletteConfig.accentText }}
              >
                {currentTime.toLocaleTimeString("pt-BR")}
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider font-bold mt-0.5">
                {currentTime.toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>
          )}

          {/* CONTROLES COMPACTOS */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900 border border-zinc-800 p-0.5 sm:p-1 rounded-xl">
            <button
              onClick={slideAnterior}
              className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer"
              style={{
                backgroundColor: isAutoPlay ? currentPaletteConfig.subtleBg : undefined,
                color: isAutoPlay ? currentPaletteConfig.accentText : "#a1a1aa",
              }}
              title={isAutoPlay ? "Pausar" : "Iniciar"}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <button
              onClick={proximoSlide}
              className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Próximo"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Configurar Tempos"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Tela Cheia"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <ThemeToggle />

            <Link
              href="/dashboard"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700 ml-0.5"
              title="Voltar ao Painel"
            >
              <LayoutDashboard className="w-3.5 h-3.5" style={{ color: currentPaletteConfig.accentText }} />
              <span className="hidden md:inline">Painel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 🟢 BARRA DE PROGRESSO */}
      <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden my-1 relative shrink-0">
        <div
          className="h-full transition-all duration-100 ease-linear rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: currentPaletteConfig.primary,
          }}
        />
      </div>

      {/* 🟢 ÁREA DE CONTEÚDO DOS SLIDES */}
      <main className="flex-1 min-h-0 relative overflow-hidden py-0.5">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* ============================================================ */}
          {/* SLIDE 1: FILAS DE ATENDIMENTO */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-2 sm:gap-2.5 px-0.5 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div
                  className="p-2 sm:p-2.5 rounded-xl border shrink-0"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <GitFork className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight leading-tight">
                    Filas de Atendimento
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    Próximos analistas da vez por equipe
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800 shrink-0">
                {previsoes.length} Filas Ativas
              </span>
            </div>

            {previsoes.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border border-zinc-800 rounded-2xl bg-zinc-900/30">
                <p className="text-zinc-200 text-base sm:text-lg font-bold">Nenhuma fila cadastrada</p>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1">Cadastre equipes no painel para ativar o roteamento.</p>
              </div>
            ) : (
              <div
                className={`flex-1 w-full gap-2.5 sm:gap-3 lg:gap-4 items-stretch min-h-0 overflow-hidden ${
                  previsoes.length === 1
                    ? "grid grid-cols-1 max-w-3xl mx-auto"
                    : previsoes.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 grid-rows-1"
                    : "grid grid-cols-1 md:grid-cols-2 auto-rows-fr"
                }`}
              >
                {previsoes.slice(0, 4).map((p) => (
                  <div
                    key={p.equipeId}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between gap-2 shadow-md h-full min-h-0 overflow-hidden"
                  >
                    {/* TOPO DO CARD */}
                    <div className="flex items-center justify-between gap-2 shrink-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-black text-base sm:text-lg lg:text-xl 2xl:text-2xl text-white truncate tracking-tight">
                          {p.equipeNome}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 truncate mt-0.5 font-medium">
                          {p.totalMembros} membros • {p.departamentos?.join(", ") || "Todos os Departamentos"}
                        </p>
                      </div>
                      {p.queueId && (
                        <span
                          className="px-3 py-1 rounded-xl text-xs sm:text-sm font-mono font-bold border shrink-0 shadow-xs"
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

                    {/* CORPO: PRÓXIMO ANALISTA (AMPLIADO & BEM LEGÍVEL) */}
                    <div className="my-auto flex-1 min-h-0 flex flex-col justify-center p-3 sm:p-3.5 lg:p-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl gap-2 overflow-hidden shadow-inner">
                      <span
                        className="text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                        style={{ color: currentPaletteConfig.accentText }}
                      >
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Próximo da Vez:
                      </span>

                      {p.proximoDaFila ? (
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl border-2 flex items-center justify-center text-base sm:text-lg lg:text-xl font-black shrink-0 shadow-md"
                            style={{
                              backgroundColor: currentPaletteConfig.subtleBg,
                              borderColor: currentPaletteConfig.subtleBorder,
                              color: currentPaletteConfig.accentText,
                            }}
                          >
                            {p.proximoDaFila.nome.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-black text-base sm:text-lg lg:text-xl 2xl:text-2xl text-white truncate leading-tight">
                              {p.proximoDaFila.nome}
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-300 font-medium truncate mt-0.5">
                              {p.proximoDaFila.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-zinc-500 italic py-1 text-center font-medium">
                          Aguardando analistas online na fila...
                        </p>
                      )}
                    </div>

                    {/* RODAPÉ DO CARD */}
                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 shrink-0 font-medium">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" style={{ color: currentPaletteConfig.accentText }} />
                        Roteamento Inteligente
                      </span>
                      <span className="font-bold text-xs" style={{ color: currentPaletteConfig.accentText }}>
                        ● Fila Ativa
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
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-1.5 px-0.5 min-h-0 overflow-hidden">
            {/* 4 CARDS PADRONIZADOS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 shrink-0">
              <div className="p-2 sm:p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs overflow-hidden min-h-0">
                <span
                  className="text-[9px] sm:text-[10px] 2xl:text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 truncate"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  Chats Criados
                </span>
                <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black text-white mt-0.5 tracking-tight truncate leading-tight">
                  {overview?.atendimentos.hoje ?? atendimentoMetrics?.metrics.criadosHoje ?? 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 font-medium truncate">Total: {overview?.atendimentos.totalGeral ?? 0}</p>
              </div>

              <div className="p-2 sm:p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs overflow-hidden min-h-0">
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  Sincronizados
                </span>
                <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black text-emerald-400 mt-0.5 tracking-tight truncate leading-tight">
                  {overview?.atendimentos.sincronizadosHoje ?? atendimentoMetrics?.metrics.sincronizados ?? 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 font-medium truncate">No Helpdesk</p>
              </div>

              <div className="p-2 sm:p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs overflow-hidden min-h-0">
                <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1 truncate">
                  <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  Pendentes
                </span>
                <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black text-amber-400 mt-0.5 tracking-tight truncate leading-tight">
                  {overview?.atendimentos.pendentesHoje ?? atendimentoMetrics?.metrics.pendentes ?? 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 font-medium truncate">Aguardando sync</p>
              </div>

              <div className="p-2 sm:p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col justify-between shadow-xs overflow-hidden min-h-0">
                <span
                  className="text-[9px] sm:text-[10px] 2xl:text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 truncate"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  Sincronia
                </span>
                <p
                  className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black mt-0.5 tracking-tight truncate leading-tight"
                  style={{ color: currentPaletteConfig.accentText }}
                >
                  {atendimentoMetrics?.metrics.taxaSincronizacao ?? 100}%
                </p>
                <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 font-medium truncate">Eficiência</p>
              </div>
            </div>

            {/* TABELA DE ATENDIMENTOS COM AUTO-SCROLL ANIMADO */}
            <div className="flex-1 min-h-0 bg-zinc-900/60 border border-zinc-800 rounded-xl p-2 sm:p-3 flex flex-col justify-between gap-1 shadow-md overflow-hidden">
              <div className="flex items-center justify-between shrink-0 pb-1 border-b border-zinc-800/80">
                <h3 className="text-[11px] sm:text-xs font-black text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: currentPaletteConfig.accentText }} />
                  Últimos Atendimentos Recebidos
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800 hidden sm:inline-flex">
                    {ultimosAtendimentos.length} Registros
                  </span>
                  <button
                    onClick={() => setIsTableAutoScroll((prev) => !prev)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold border transition-all cursor-pointer shadow-xs ${
                      isTableAutoScroll
                        ? "text-white"
                        : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                    style={{
                      backgroundColor: isTableAutoScroll ? currentPaletteConfig.primary : undefined,
                      borderColor: isTableAutoScroll ? currentPaletteConfig.primary : undefined,
                    }}
                    title={isTableAutoScroll ? "Clique para pausar" : "Clique para ativar"}
                  >
                    {isTableAutoScroll ? (
                      <>
                        <Pause className="w-2.5 h-2.5" />
                        <span>Rolagem Ativa</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5" />
                        <span>Pausada</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div
                ref={tableScrollRef}
                className="overflow-y-auto flex-1 min-h-0 pr-1 select-none scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                <table className="w-full text-left">
                  <thead className="text-zinc-400 uppercase text-[9px] sm:text-[10px] font-black tracking-wider border-b border-zinc-800 pb-1.5 sticky top-0 bg-zinc-900/95 backdrop-blur-md z-10">
                    <tr>
                      <th className="pb-1.5 pt-0.5 font-black">Ticket</th>
                      <th className="pb-1.5 pt-0.5 font-black">Cliente</th>
                      <th className="pb-1.5 pt-0.5 font-black">Atendente</th>
                      <th className="pb-1.5 pt-0.5 font-black">Status</th>
                      <th className="pb-1.5 pt-0.5 font-black text-right">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                    {ultimosAtendimentos.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-zinc-500 font-medium text-xs">
                          Nenhum atendimento registrado no momento. Aguardando novos chats...
                        </td>
                      </tr>
                    ) : (
                      ultimosAtendimentos.slice(0, 20).map((at) => (
                        <tr key={at.id} className="hover:bg-zinc-800/50 transition-colors">
                          <td className="py-1.5 sm:py-2 font-mono font-bold text-xs sm:text-sm" style={{ color: currentPaletteConfig.accentText }}>
                            {at.ticketZpro ? `#${at.ticketZpro}` : at.protocolo || "-"}
                          </td>
                          <td className="py-1.5 sm:py-2 font-bold text-white text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[200px] 2xl:max-w-[260px]">
                            {at.nomeContato || "Cliente WhatsApp"}
                          </td>
                          <td className="py-1.5 sm:py-2 font-semibold text-zinc-100 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[160px]">
                            {at.atendente || "Automático"}
                          </td>
                          <td className="py-1.5 sm:py-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold ${at.sincronizado
                                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                                  : "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                                }`}
                            >
                              {at.sincronizado ? "Sincronizado" : "Pendente"}
                            </span>
                          </td>
                          <td className="py-1.5 sm:py-2 text-right font-mono text-zinc-300 text-[11px] sm:text-xs font-bold">
                            {formatarHoraLocal(at.createdAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 3: ESCALA DE PLANTÃO */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-2 sm:gap-3 px-0.5 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div
                  className="p-2 sm:p-2.5 rounded-xl border shrink-0"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-black text-white tracking-tight leading-tight">
                    Escala de Plantão
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    Plantonista da vez e cronograma agendado
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800 shrink-0">
                {escalas.length} Plantões Cadastrados
              </span>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch min-h-0 overflow-hidden">
              {/* CARD PLANTONISTA ATUAL (GRANDE & DESTACADO) */}
              <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-md h-full min-h-0 overflow-hidden">
                <div className="shrink-0 flex items-center justify-between">
                  <span
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider border shadow-xs"
                    style={{
                      backgroundColor: currentPaletteConfig.subtleBg,
                      borderColor: currentPaletteConfig.subtleBorder,
                      color: currentPaletteConfig.accentText,
                    }}
                  >
                    <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    Plantonista da Vez
                  </span>
                  <span className="text-xs font-mono text-zinc-400 font-bold bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                    Suporte TI
                  </span>
                </div>

                <div className="my-auto flex-1 min-h-0 flex flex-col items-center justify-center text-center p-4 sm:p-5 bg-zinc-950 border border-zinc-800 rounded-2xl gap-2 sm:gap-3 shadow-inner overflow-hidden">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl border-3 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-black shadow-lg shrink-0"
                    style={{
                      backgroundColor: currentPaletteConfig.subtleBg,
                      borderColor: currentPaletteConfig.subtleBorder,
                      color: currentPaletteConfig.accentText,
                    }}
                  >
                    {(plantonistaAtivo?.user?.name || plantonistaAtivo?.nome || "PL").substring(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 max-w-full">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-black text-white tracking-tight leading-tight truncate">
                      {plantonistaAtivo?.user?.name || plantonistaAtivo?.nome || "A Definir"}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-300 mt-1 font-medium truncate">
                      {plantonistaAtivo?.user?.email || "Plantonista Ativo no Sistema"}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 bg-zinc-950/90 border border-zinc-800 rounded-xl shrink-0">
                  <p className="text-[11px] sm:text-xs font-black text-zinc-400 uppercase tracking-wider">
                    Data do Plantão:
                  </p>
                  <p
                    className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-black capitalize mt-0.5 tracking-tight truncate"
                    style={{ color: currentPaletteConfig.accentText }}
                  >
                    {plantonistaAtivo?.data
                      ? `${formatarDiaSemana(plantonistaAtivo.data)}, ${formatarData(plantonistaAtivo.data)}`
                      : "Hoje"}
                  </p>
                </div>
              </div>

              {/* LISTA DOS PRÓXIMOS (LEGÍVEL & BEM PROPORCIONADA) */}
              <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-md h-full min-h-0 overflow-hidden">
                <div className="flex items-center justify-between shrink-0 pb-2 border-b border-zinc-800">
                  <h3 className="text-xs sm:text-sm lg:text-base font-black text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: currentPaletteConfig.accentText }} />
                    Próximos Plantões Agendados
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono font-medium">Ordem Cronológica</span>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 items-stretch content-start min-h-0 overflow-y-auto pr-0.5">
                  {listaEscalasExibir.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-2.5 sm:p-3 bg-zinc-950 border border-zinc-800/90 rounded-xl flex items-center justify-between gap-2.5 shadow-xs min-h-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-black text-zinc-100 text-xs sm:text-sm shrink-0 shadow-xs">
                          #{idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-black text-sm sm:text-base lg:text-lg text-white truncate leading-tight">
                            {item.user?.name || "Analista"}
                          </p>
                          <p className="text-xs sm:text-sm text-zinc-300 font-semibold capitalize truncate mt-0.5">
                            {formatarDiaSemana(item.data, "short")}
                          </p>
                        </div>
                      </div>

                      <span
                        className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-zinc-900 border shrink-0 shadow-xs"
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

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800 shrink-0 font-medium">
                  <span>Escalas automáticas ativas</span>
                  <span>Sincronizado com o banco</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 4: PRODUTIVIDADE DOS ANALISTAS */}
          {/* ============================================================ */}
          <div className="w-full h-full shrink-0 flex flex-col justify-between gap-2 sm:gap-2.5 px-0.5 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div
                  className="p-2 sm:p-2.5 rounded-xl border shrink-0"
                  style={{
                    backgroundColor: currentPaletteConfig.subtleBg,
                    borderColor: currentPaletteConfig.subtleBorder,
                    color: currentPaletteConfig.accentText,
                  }}
                >
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-black text-white tracking-tight leading-tight">
                    Produtividade dos Analistas
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    Chamados em curso, pendentes e resolvidos por atendente
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800 shrink-0">
                {analistasValidos.length} Analistas Ativos
              </span>
            </div>

            {analistasValidos.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border border-zinc-800 rounded-2xl bg-zinc-900/30">
                <p className="text-zinc-200 text-base sm:text-lg font-bold">Nenhuma atividade registrada hoje</p>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1">Os dados são sincronizados automaticamente em tempo real.</p>
              </div>
            ) : (
              <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-3.5 content-start items-stretch overflow-y-auto max-h-full pr-1">
                {analistasValidos.map((analista, idx) => (
                  <div key={analista.email || analista.name || idx} className="h-full min-h-[130px] sm:min-h-[145px] lg:min-h-[155px] overflow-hidden">
                    <AnalistaMetricCard dados={analista} compact={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🟢 BARRA INFERIOR: NAVEGAÇÃO DOS SLIDES (ULTRA COMPACTA & RESPONSIVA) */}
      <footer className="flex items-center justify-between gap-1.5 sm:gap-2 pt-1 pb-0.5 border-t border-zinc-800/80 shrink-0 text-xs">
        {/* BOTÕES DE NAVEGAÇÃO */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SLIDES_CONFIG.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const tempoSlide = slideIntervals[idx] || slide.defaultSec;

            return (
              <button
                key={idx}
                onClick={() => irParaSlide(idx)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${isActive
                    ? "text-white shadow-xs"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                style={{
                  backgroundColor: isActive ? currentPaletteConfig.primary : undefined,
                }}
              >
                <span>{idx + 1}.</span>
                <span className="truncate max-w-[80px] sm:max-w-[130px] lg:max-w-[170px]">{slide.title}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded ${isActive ? "text-white bg-black/25 font-bold" : "bg-zinc-800 text-zinc-400"
                    }`}
                >
                  {tempoSlide}s
                </span>
              </button>
            );
          })}
        </div>

        {/* AJUSTE RÁPIDO DE TEMPO */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-zinc-400 shrink-0">
          <span className="font-bold text-zinc-400 hidden md:inline">Tempo:</span>
          <div className="flex items-center gap-0.5 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            {[10, 15, 20, 30, 45, 60].map((sec) => {
              const isSecSelected = duracaoSlideAtual === sec;
              return (
                <button
                  key={sec}
                  onClick={() => salvarIntervaloSlide(currentSlide, sec)}
                  className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer ${isSecSelected
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
