"use client";

import { useEffect, useState } from "react";
import {
  distribuicaoService,
  PrevisaoFila,
  DistribuirResponse,
} from "@/services";
import {
  GitFork,
  Radio,
  Play,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  User,
  ShieldAlert,
  Zap,
  Sparkles,
} from "lucide-react";
import { env } from "@/lib/env";

export default function DistribuicaoPage() {
  const [previsoes, setPrevisoes] = useState<PrevisaoFila[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulador de Triagem
  const [departamento, setDepartamento] = useState("suporte_operacional");
  const [fila, setFila] = useState("N1-Suporte");
  const [ticketId, setTicketId] = useState("18001");
  const [clienteId, setClienteId] = useState("1050");
  const [numero, setNumero] = useState("556999999999");
  const [pushName, setPushName] = useState("Cliente Teste");
  const [ignorarApisExternas, setIgnorarApisExternas] = useState(false);

  const [simulando, setSimulando] = useState(false);
  const [resultadoSimulacao, setResultadoSimulacao] = useState<DistribuirResponse | null>(null);

  const loadPrevisoes = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);

      const data = await distribuicaoService.getPrevisaoFilas();
      setPrevisoes(data);
    } catch (err) {
      console.error("Erro ao carregar previsão de filas:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPrevisoes();

    // 🟢 Conexão SSE em tempo real para sincronização instantânea
    let sse: EventSource | null = null;
    try {
      const sseUrl = `${env.NEXT_PUBLIC_API_URL}/dashboard/stream`;
      sse = new EventSource(sseUrl, { withCredentials: true });

      sse.addEventListener("dashboard_update", (event: MessageEvent) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.entity === "distribuicao" || payload.entity === "atendimento") {
            loadPrevisoes(false);
          }
        } catch {}
      });
    } catch {}

    const interval = setInterval(() => {
      loadPrevisoes(false);
    }, 10000); // Polling de backup

    return () => {
      if (sse) sse.close();
      clearInterval(interval);
    };
  }, []);

  const handleSimularDistribuicao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSimulando(true);
      const res = await distribuicaoService.distribuir({
        departamento,
        fila,
        ticketId,
        clienteId,
        numero,
        pushName,
        ignorarApisExternas,
      });
      setResultadoSimulacao(res);
      loadPrevisoes(false);
    } catch (err: any) {
      setResultadoSimulacao({
        sucesso: false,
        status: "error",
        userId: null,
        atendenteNome: null,
        atendenteEmail: null,
        atendenteSlack: null,
        queueId: null,
        queueName: null,
        equipeNome: "Erro",
        modoDistribuicao: "erro_execucao",
        pontuacaoCarga: 0,
        error: err.response?.data?.error || err.message,
      });
    } finally {
      setSimulando(false);
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-sans antialiased text-left">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/50 p-5 rounded-lg border border-zinc-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-zinc-100">Distribuição & Previsão de Filas</h1>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Radio className="w-2.5 h-2.5" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Monitore o próximo analista de cada equipe e valide as regras de roteamento inteligente.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => loadPrevisoes(false)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-md border border-zinc-700 transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${refreshing ? "animate-spin" : ""}`} />
          <span>Atualizar Filas</span>
        </button>
      </div>

      {/* CARDS DE PREVISÃO POR FILA */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Ordem de Atendimento por Fila (Tempo Real)</span>
        </h2>

        {loading ? (
          <div className="flex items-center justify-center p-8 text-zinc-400 text-xs">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
            Carregando previsão de filas...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {previsoes.map((p) => (
              <div
                key={p.equipeId}
                className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-zinc-100">{p.equipeNome}</h3>
                    {p.queueId && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 border border-zinc-700 text-zinc-300">
                        #{p.queueId}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {p.totalMembros} membros • {p.departamentos?.join(", ") || "Todos"}
                  </p>

                  {/* PRÓXIMO ANALISTA */}
                  <div className="mt-3 p-2.5 bg-zinc-950 border border-zinc-800 rounded-md space-y-1">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      Próximo a Receber Chat:
                    </span>

                    {p.proximoDaFila ? (
                      <div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="font-semibold text-xs text-zinc-100">{p.proximoDaFila.nome}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 pl-5">{p.proximoDaFila.email}</p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-zinc-500 italic py-0.5">Nenhum membro ativo no momento</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SIMULADOR DE TRIAGEM / TESTE DE ROTA */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-800">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <div>
            <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider">Simulador de Triagem e Distribuição</h2>
            <p className="text-[11px] text-zinc-400">
              Simule a requisição do n8n e verifique o cálculo de decisão do backend em tempo real.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimularDistribuicao} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Departamento</label>
            <input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              placeholder="Ex: suporte_operacional"
              className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Fila (Opcional)</label>
            <input
              type="text"
              value={fila}
              onChange={(e) => setFila(e.target.value)}
              placeholder="Ex: N1-Suporte"
              className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Ticket ID / Número</label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={ignorarApisExternas}
                onChange={(e) => setIgnorarApisExternas(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0"
              />
              <span>Forçar Fallback Sequencial Round-Robin (ignorar APIs externas)</span>
            </label>

            <button
              type="submit"
              disabled={simulando}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-all cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{simulando ? "Distribuindo..." : "Executar Simulação"}</span>
            </button>
          </div>
        </form>

        {/* RESULTADO DA SIMULAÇÃO */}
        {resultadoSimulacao && (
          <div className="mt-3 p-3.5 bg-zinc-950 border border-zinc-800 rounded-md space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Resposta da API (n8n payload):
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  resultadoSimulacao.sucesso
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {resultadoSimulacao.sucesso ? "Sucesso (200 OK)" : "Falha"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-zinc-800/80">
              <div>
                <span className="text-[11px] text-zinc-500">Atendente Selecionado:</span>
                <p className="font-semibold text-zinc-100">
                  {resultadoSimulacao.atendenteNome || "Nenhum"} (ID: {resultadoSimulacao.userId || "N/A"})
                </p>
                <p className="text-[11px] text-zinc-400">{resultadoSimulacao.atendenteEmail}</p>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500">Fila & Equipe:</span>
                <p className="font-semibold text-zinc-100">
                  {resultadoSimulacao.equipeNome} (Fila #{resultadoSimulacao.queueId})
                </p>
                <p className="text-[11px] text-zinc-400">{resultadoSimulacao.queueName}</p>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500">Modo de Distribuição:</span>
                <p className="font-semibold text-blue-400 font-mono">
                  {resultadoSimulacao.modoDistribuicao}
                </p>
                {resultadoSimulacao.metricas && (
                  <p className="text-[10px] text-zinc-500">
                    Carga: {resultadoSimulacao.metricas.abertos} abertos • {resultadoSimulacao.metricas.pendentes} pendentes
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
