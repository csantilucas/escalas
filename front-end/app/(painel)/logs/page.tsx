"use client";

import { useEffect, useState, useRef } from "react";
import { atendimentoService, tokenService } from "@/services";
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

  // Inicializa logs históricos a partir dos atendimentos recentes
  const carregarHistorico = async () => {
    try {
      const atendRes = await atendimentoService.list({ limit: 25 });
      const historicoInicial: AuditLog[] = (atendRes.data || []).map((at) => ({
        id: at.id,
        timestamp: at.createdAt,
        type: "ATENDIMENTO",
        severity: at.sincronizado ? "success" : "warning",
        title: `Atendimento ${at.protocolo || at.ticketZpro || "Registrado"}`,
        description: `Cliente: ${at.nomeContato || "N/A"} | Atendente: ${at.atendente || "Automático"} | CNPJ: ${at.cnpj || "-"}`,
        details: at,
      }));

      // Adiciona logs de sistema simulados
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

      setLogs([...historicoInicial, ...systemLogs]);
    } catch (err) {
      console.error("Erro ao buscar histórico de logs:", err);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  // Conexão SSE em tempo real
  useEffect(() => {
    if (!isLive) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      return;
    }

    try {
      const sseUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/dashboard/stream`;
      const sse = new EventSource(sseUrl, { withCredentials: true });
      eventSourceRef.current = sse;

      sse.onopen = () => {
        setServiceStatus((prev) => ({ ...prev, sse: "connected" }));
      };

      sse.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const newLog: AuditLog = {
            id: `sse-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
            timestamp: new Date().toISOString(),
            type: data.type === "fallback" ? "FALLBACK" : "DISTRIBUICAO",
            severity: data.type === "fallback" ? "warning" : "success",
            title: data.event || "Evento de Distribuição",
            description: data.message || `Distribuição processada para ${data.analista || "atendente"}.`,
            details: data,
          };

          setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
        } catch {}
      };

      sse.onerror = () => {
        setServiceStatus((prev) => ({ ...prev, sse: "disconnected" }));
      };

      return () => {
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
                Acompanhe em tempo real todas as decisões de roteamento, atendimentos e sincronizações.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
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
            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* STATUS DOS SERVIÇOS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase">Streaming SSE</p>
            <p className="text-sm font-bold text-zinc-200 mt-0.5">
              {serviceStatus.sse === "connected" ? "Conectado" : "Aguardando"}
            </p>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse" />
        </div>

        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase">Z-PRO WhatsApp</p>
            <p className="text-sm font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>

        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase">Alpha Dash API</p>
            <p className="text-sm font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>

        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase">Tomticket API</p>
            <p className="text-sm font-bold text-zinc-200 mt-0.5">Operacional</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* FILTROS E BUSCA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar nos eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">Tipo de Evento:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todos os Eventos</option>
            <option value="DISTRIBUICAO">Distribuição Ponderada</option>
            <option value="FALLBACK">Fallback Round-Robin</option>
            <option value="ATENDIMENTO">Atendimentos</option>
            <option value="SISTEMA">Sistema</option>
          </select>
        </div>
      </div>

      {/* FEED DE LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LISTAGEM DE EVENTOS */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Feed de Eventos em Tempo Real
            </h2>
            <span className="text-xs text-zinc-500 font-mono">{filteredLogs.length} eventos filtrados</span>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">
              Nenhum log encontrado para os critérios informados.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredLogs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLog(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedLog?.id === item.id
                      ? "bg-zinc-800/80 border-blue-500 shadow-md"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(item.severity)}`}>
                        {item.type}
                      </span>
                      <h3 className="text-xs font-bold text-zinc-200 truncate">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DETALHES DO EVENTO SELECIONADO */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Inspetor de Detalhes
          </h2>

          {selectedLog ? (
            <div className="space-y-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(selectedLog.severity)}`}>
                  {selectedLog.type}
                </span>
                <h3 className="text-base font-bold text-zinc-100 mt-2">{selectedLog.title}</h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  {new Date(selectedLog.timestamp).toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                <p className="text-xs font-semibold text-zinc-400 mb-1">Descrição</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedLog.description}</p>
              </div>

              {selectedLog.details && (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 mb-1.5">Payload / Dados Técnicos</p>
                  <pre className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[220px]">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 text-xs italic">
              Clique em qualquer evento do feed ao lado para inspecionar os detalhes técnicos completos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
