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
    const interval = setInterval(() => {
      loadPrevisoes(false);
    }, 10000); // Polling a cada 10s

    return () => clearInterval(interval);
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <GitFork className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-zinc-100">Distribuição & Previsão de Filas</h1>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Radio className="w-3 h-3 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                Monitore em tempo real o próximo analista de cada fila e teste a inteligência de roteamento.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => loadPrevisoes(false)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold rounded-xl border border-zinc-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${refreshing ? "animate-spin" : ""}`} />
          <span>Atualizar Fila</span>
        </button>
      </div>

      {/* CARDS DE PREVISÃO POR FILA */}
      <div>
        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Ordem de Atendimento por Fila (Ao Vivo)</span>
        </h2>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-zinc-400">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-3" />
            Carregando previsão de filas...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {previsoes.map((p) => (
              <div
                key={p.equipeId}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-zinc-100">{p.equipeNome}</h3>
                    {p.queueId && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        Fila #{p.queueId}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 mt-1">
                    {p.totalMembros} membros na equipe • {p.departamentos?.join(", ") || "Todos"}
                  </p>

                  {/* PRÓXIMO ANALISTA */}
                  <div className="mt-4 p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                      Próximo a Receber Chat:
                    </span>

                    {p.proximoDaFila ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-zinc-400" />
                          <span className="font-bold text-sm text-zinc-100">{p.proximoDaFila.nome}</span>
                        </div>
                        <p className="text-xs text-zinc-500 pl-6">{p.proximoDaFila.email}</p>
                        {p.proximoDaFila.ultimoAtendimentoEm && (
                          <p className="text-[10px] text-zinc-600 pl-6 mt-1">
                            Último chat: {new Date(p.proximoDaFila.ultimoAtendimentoEm).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">Nenhum membro ativo no momento</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SIMULADOR DE TRIAGEM / TESTE DE ROTA */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-base font-bold text-zinc-100">Simulador de Triagem e Distribuição</h2>
            <p className="text-xs text-zinc-400">
              Simule a requisição que o n8n envia ao backend e visualize a decisão calculada em tempo real.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimularDistribuicao} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Departamento</label>
            <input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              placeholder="Ex: suporte_operacional"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Fila (Opcional)</label>
            <input
              type="text"
              value={fila}
              onChange={(e) => setFila(e.target.value)}
              placeholder="Ex: N1-Suporte"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Ticket ID / Número</label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 pt-2">
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
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>{simulando ? "Distribuindo..." : "Executar Simulação"}</span>
            </button>
          </div>
        </form>

        {/* RESULTADO DA SIMULAÇÃO */}
        {resultadoSimulacao && (
          <div className="mt-4 p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Resultado retornado para o n8n:
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  resultadoSimulacao.sucesso
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {resultadoSimulacao.sucesso ? "Sucesso (200 OK)" : "Falha"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-zinc-800/60">
              <div>
                <span className="text-xs text-zinc-500">Atendente Escolhido:</span>
                <p className="font-bold text-sm text-zinc-100">
                  {resultadoSimulacao.atendenteNome || "Nenhum"} (ID Z-PRO: {resultadoSimulacao.userId || "N/A"})
                </p>
                <p className="text-xs text-zinc-400">{resultadoSimulacao.atendenteEmail}</p>
              </div>

              <div>
                <span className="text-xs text-zinc-500">Fila & Equipe:</span>
                <p className="font-bold text-sm text-zinc-100">
                  {resultadoSimulacao.equipeNome} (Fila #{resultadoSimulacao.queueId})
                </p>
                <p className="text-xs text-zinc-400">{resultadoSimulacao.queueName}</p>
              </div>

              <div>
                <span className="text-xs text-zinc-500">Modo de Distribuição:</span>
                <p className="font-bold text-sm text-emerald-400 font-mono">
                  {resultadoSimulacao.modoDistribuicao}
                </p>
                {resultadoSimulacao.metricas && (
                  <p className="text-[11px] text-zinc-500">
                    Carga: {resultadoSimulacao.metricas.abertos} abertos | {resultadoSimulacao.metricas.pendentes} pendentes
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
