"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { atendimentoService, distribuicaoService, tokenService } from "@/services";
import {
  Activity,
  Radio,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Download,
  Pause,
  Play,
  Server,
  Layers,
  Sparkles,
} from "lucide-react";
import { formatarHoraLocal, formatarDataHora } from "@/lib/dateUtils";
import { env } from "@/lib/env";

interface AuditLog {
  id: string;
  timestamp: string;
  type: "DISTRIBUICAO" | "ATENDIMENTO" | "FALLBACK" | "SISTEMA" | "AUTH";
  severity: "info" | "success" | "warning" | "error";
  title: string;
  description: string;
  details?: any;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Status de Serviços
  const [serviceStatus, setServiceStatus] = useState({
    zpro: "online",
    alpha: "online",
    tomticket: "online",
    sse: "connected",
  });

  const eventSourceRef = useRef<EventSource | null>(null);

  // 🟢 Carrega histórico persistido de Distribuições e Atendimentos do Banco
  const carregarHistorico = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);

      const [atendRes, distRes] = await Promise.all([
        atendimentoService.list({ limit: 50 }).catch((e) => {
          console.error("Erro ao buscar atendimentos:", e);
          return { data: [] };
        }),
        distribuicaoService.getRecentLogs(100).catch((e) => {
          console.error("Erro ao buscar distribuições:", e);
          return [];
        }),
      ]);

      // 1. Mapeia Atendimentos salvos
      const historicoAtendimentos: AuditLog[] = (atendRes.data || []).map((at) => ({
        id: at.id,
        timestamp: at.createdAt,
        type: "ATENDIMENTO",
        severity: at.sincronizado ? "success" : "warning",
        title: `Atendimento ${at.protocolo || at.ticketZpro || "Registrado"}`,
        description: `Cliente: ${at.nomeContato || "N/A"} | Atendente: ${at.atendente || "Automático"} | CNPJ: ${at.cnpj || "-"}`,
        details: at,
      }));

      // 2. Mapeia Distribuições salvas do Banco de Dados
      const historicoDistribuicoes: AuditLog[] = (distRes || []).map((dist) => {
        const isFallback = (dist.modoDistribuicao || "").toLowerCase().includes("fallback");
        const type: "DISTRIBUICAO" | "FALLBACK" = isFallback ? "FALLBACK" : "DISTRIBUICAO";
        const severity: "success" | "warning" | "error" = !dist.sucesso
          ? "error"
          : isFallback
          ? "warning"
          : "success";

        return {
          id: dist.id,
          timestamp: dist.createdAt,
          type,
          severity,
          title: `Distribuição #${dist.ticketId || dist.numero || "Novo Chat"}`,
          description: `Atendente: ${dist.atendenteNome || "Nenhum (Fallback)"} | Fila: ${dist.equipeNome || dist.queueName || "N1"} | Modo: ${dist.modoDistribuicao || "Ponderado"}`,
          details: dist,
        };
      });

      // 3. Log de Sistema
      const systemLogs: AuditLog[] = [
        {
          id: "sys-1",
          timestamp: new Date().toISOString(),
          type: "SISTEMA",
          severity: "info",
          title: "Motor de Distribuição Ativo",
          description: "Distribuição ponderada e rotação sequencial inicializadas com sucesso.",
        },
      ];

      // Unifica todos os logs e ordena pelo mais recente
      const todosLogs = [...historicoDistribuicoes, ...historicoAtendimentos, ...systemLogs].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setLogs(todosLogs);
      if (todosLogs.length > 0 && !selectedLog) {
        setSelectedLog(todosLogs[0]);
      }
    } catch (err) {
      console.error("Erro ao buscar histórico de logs:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedLog]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  // Conexão SSE em tempo real
  useEffect(() => {
    if (!isLive) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      return;
    }

    try {
      const sseUrl = `${env.NEXT_PUBLIC_API_URL}/dashboard/stream`;
      const sse = new EventSource(sseUrl, { withCredentials: true });
      eventSourceRef.current = sse;

      sse.onopen = () => {
        setServiceStatus((prev) => ({ ...prev, sse: "connected" }));
      };

      const handleDashboardUpdate = (event: MessageEvent) => {
        try {
          const payload = JSON.parse(event.data);
          const entity = String(payload.entity || "").toLowerCase();
          const action = String(payload.action || "").toLowerCase();
          const data = payload.data || {};

          let type: "DISTRIBUICAO" | "ATENDIMENTO" | "FALLBACK" | "SISTEMA" | "AUTH" = "DISTRIBUICAO";
          let severity: "info" | "success" | "warning" | "error" = "info";
          let title = `Evento ${payload.entity || "Sistema"}`;
          let description = "Evento processado pelo servidor.";

          if (entity === "distribuicao") {
            const isFallback = (data.modoDistribuicao || "").toLowerCase().includes("fallback");
            type = isFallback ? "FALLBACK" : "DISTRIBUICAO";
            severity = isFallback ? "warning" : "success";
            title = `Distribuição #${data.ticketId || data.numero || "Novo Chat"}`;
            description = `Atendente: ${data.atendenteNome || "Nenhum (Fallback)"} | Fila: ${data.equipeNome || data.queueName || "N1"} | Modo: ${data.modoDistribuicao || "Ponderado"}`;
          } else if (entity === "atendimento") {
            type = "ATENDIMENTO";
            severity = data.sincronizado ? "success" : "info";
            title = `Atendimento ${data.protocolo || data.ticketZpro || "Registrado"}`;
            description = `Cliente: ${data.nomeContato || "N/A"} | Atendente: ${data.atendente || "Automático"}`;
          } else if (entity === "registro" || entity === "plantonista") {
            type = "SISTEMA";
            severity = "info";
            title = `Escala de Plantão (${action})`;
            description = `Atualização cadastral no sistema de escalas.`;
          }

          const newLog: AuditLog = {
            id: data.id || `sse-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            timestamp: payload.timestamp || data.createdAt || new Date().toISOString(),
            type,
            severity,
            title,
            description,
            details: data,
          };

          setLogs((prev) => {
            // Evita duplicação se o item já estiver na lista pelo ID
            const exists = prev.some((l) => l.id === newLog.id);
            if (exists) return prev;
            return [newLog, ...prev.slice(0, 199)];
          });
        } catch (err) {
          console.error("Erro ao processar evento SSE no painel de logs:", err);
        }
      };

      sse.addEventListener("dashboard_update", handleDashboardUpdate);
      sse.addEventListener("connected", () => {
        setServiceStatus((prev) => ({ ...prev, sse: "connected" }));
      });

      sse.onerror = () => {
        setServiceStatus((prev) => ({ ...prev, sse: "disconnected" }));
      };

      return () => {
        sse.removeEventListener("dashboard_update", handleDashboardUpdate);
        sse.close();
      };
    } catch (err) {
      console.warn("SSE indisponível:", err);
    }
  }, [isLive]);

  // Filtros
  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === "ALL" || log.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const exportarLogsJSON = () => {
    const blob = new Blob([JSON.stringify(filteredLogs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-auditoria-${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityBadge = (sev: AuditLog["severity"]) => {
    switch (sev) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "warning":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "error":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      default:
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-zinc-100">Logs de Auditoria & Distribuição</h1>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {isLive ? "Stream Ao Vivo" : "Pausado"}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                Acompanhe em tempo real todas as decisões de roteamento, atendimentos e sincronizações persistidas no banco.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => carregarHistorico(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${refreshing ? "animate-spin" : ""}`} />
            <span>Atualizar Logs</span>
          </button>

          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isLive
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
            }`}
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLive ? "Pausar Live" : "Retomar Live"}</span>
          </button>

          <button
            onClick={exportarLogsJSON}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* STATUS DOS SERVIÇOS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Streaming SSE</p>
            <p className="text-xs font-bold text-zinc-200 mt-0.5">
              {serviceStatus.sse === "connected" ? "Conectado" : "Aguardando"}
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Z-PRO WhatsApp</p>
            <p className="text-xs font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Alpha Dash API</p>
            <p className="text-xs font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Tomticket API</p>
            <p className="text-xs font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* FILTROS E BUSCA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar nos eventos salvos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] text-zinc-400 font-medium whitespace-nowrap">Filtrar por:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todos os Eventos ({logs.length})</option>
            <option value="DISTRIBUICAO">Distribuição Ponderada</option>
            <option value="FALLBACK">Fallback Round-Robin</option>
            <option value="ATENDIMENTO">Atendimentos</option>
            <option value="SISTEMA">Sistema</option>
          </select>
        </div>
      </div>

      {/* FEED DE LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LISTAGEM DE EVENTOS */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h2 className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Feed de Eventos e Auditoria
            </h2>
            <span className="text-[10px] text-zinc-500 font-mono">
              {loading ? "Carregando histórico..." : `${filteredLogs.length} eventos listados`}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 text-zinc-400 text-xs">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              Carregando histórico persistido...
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-xs">
              Nenhum log encontrado para os critérios informados.
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredLogs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLog(item)}
                  className={`p-2.5 rounded-md border transition-all cursor-pointer ${
                    selectedLog?.id === item.id
                      ? "bg-zinc-800 border-blue-500 shadow-xs"
                      : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getSeverityBadge(item.severity)}`}>
                        {item.type}
                      </span>
                      <h3 className="text-xs font-semibold text-zinc-200 truncate">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {formatarHoraLocal(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DETALHES DO EVENTO SELECIONADO */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 space-y-3 shadow-xs">
          <h2 className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5 pb-2 border-b border-zinc-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Inspetor de Detalhes
          </h2>

          {selectedLog ? (
            <div className="space-y-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(selectedLog.severity)}`}>
                  {selectedLog.type}
                </span>
                <h3 className="text-sm font-bold text-zinc-100 mt-1.5">{selectedLog.title}</h3>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  {formatarDataHora(selectedLog.timestamp)}
                </p>
              </div>

              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-md">
                <p className="text-[10px] font-semibold text-zinc-400 mb-0.5">Descrição</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedLog.description}</p>
              </div>

              {selectedLog.details && (
                <div>
                  <p className="text-[10px] font-semibold text-zinc-400 mb-1">Payload / Dados Técnicos</p>
                  <pre className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-md text-[10px] font-mono text-zinc-300 overflow-x-auto max-h-[220px]">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-zinc-500 text-xs italic">
              Clique em qualquer evento do feed ao lado para inspecionar os detalhes técnicos completos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
