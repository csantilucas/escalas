"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  atendimentoService, 
  AtendimentoModel, 
  AtendimentoPagination,
  DashboardMetricsResponse 
} from "@/services";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  Calendar,
  XCircle,
  TrendingUp,
  PieChart,
  Users
} from "lucide-react";

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<AtendimentoModel[]>([]);
  const [pagination, setPagination] = useState<AtendimentoPagination | null>(null);
  const [metricsData, setMetricsData] = useState<DashboardMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados dos Filtros
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [busca, setBusca] = useState<string>("");
  const [analista, setAnalista] = useState<string>("");
  const [sincronizado, setSincronizado] = useState<string>(""); // "" | "true" | "false"
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  // 🔄 Função para carregar Tabela e Métricas em paralelo
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const commonFilters = {
        page,
        limit,
        busca: busca.trim() || undefined,
        atendente: analista || undefined,
        sincronizado: sincronizado !== "" ? sincronizado === "true" : undefined,
        dataInicio: dataInicio || undefined,
        dataFim: dataFim || undefined,
      };

      // Executa as duas chamadas no servidor simultaneamente
      const [listRes, metricsRes] = await Promise.all([
        atendimentoService.list(commonFilters),
        atendimentoService.getMetrics({
          atendente: analista || undefined,
          dataInicio: dataInicio || undefined,
          dataFim: dataFim || undefined,
        }),
      ]);

      setAtendimentos(listRes.data);
      setPagination(listRes.pagination);
      setMetricsData(metricsRes);
    } catch (error) {
      console.error("Erro ao carregar dados de atendimentos:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, busca, analista, sincronizado, dataInicio, dataFim]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleClearFilters = () => {
    setBusca("");
    setAnalista("");
    setSincronizado("");
    setDataInicio("");
    setDataFim("");
    setPage(1);
  };

  const selectAnalistaFilter = (nome: string) => {
    setAnalista(nome === "Não Atribuído" ? "" : nome);
    setPage(1);
  };

  // Valores extraídos das métricas do Banco
  const m = metricsData?.metrics || {
    total: 0,
    sincronizados: 0,
    pendentes: 0,
    criadosHoje: 0,
    taxaSincronizacao: 0,
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 text-zinc-100 font-sans">
      {/* 🟢 CABEÇALHO */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Painel Geral de Atendimentos
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Métricas consolidadas e relatórios por analistas ZPro & Tomticket.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700/80 rounded-lg text-sm font-medium hover:bg-zinc-700/80 hover:text-white transition-all active:scale-95 disabled:opacity-50 self-start md:self-auto"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Atualizar Dados
        </button>
      </div>

      {/* 🟢 BLOCOS DE CARDS KPI (VINDOS DO BANCO DE DADOS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Registrados</p>
            <p className="text-2xl font-bold text-zinc-100">{m.total}</p>
            <span className="text-[11px] text-zinc-500">Base completa filtrada</span>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
            <Layers size={22} />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Sincronizados (Tomticket)</p>
            <p className="text-2xl font-bold text-emerald-400">{m.sincronizados}</p>
            <span className="text-[11px] text-emerald-500/80">Com suporte atrelado</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pendentes (Somente ZPro)</p>
            <p className="text-2xl font-bold text-amber-400">{m.pendentes}</p>
            <span className="text-[11px] text-amber-500/80">Aguardando espelhamento</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Clock size={22} />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Criados Hoje</p>
            <p className="text-2xl font-bold text-sky-400">{m.criadosHoje}</p>
            <span className="text-[11px] text-zinc-500">Entradas no dia atual</span>
          </div>
          <div className="p-3 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* 🟢 GRÁFICOS & RANKING DE ANALISTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card Taxa de Integração */}
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <PieChart size={18} className="text-indigo-400" />
              <h3 className="text-sm font-semibold text-zinc-200">Taxa Geral de Integração</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {m.taxaSincronizacao}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Sincronizados ({m.sincronizados})</span>
              <span>Pendentes ({m.pendentes})</span>
            </div>
            <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden flex p-0.5">
              <div 
                style={{ width: `${m.taxaSincronizacao}%` }} 
                className="bg-emerald-500 h-full rounded-l-full transition-all duration-500" 
              />
              <div 
                style={{ width: `${100 - m.taxaSincronizacao}%` }} 
                className="bg-amber-500 h-full rounded-r-full transition-all duration-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="p-2 bg-zinc-950/50 rounded-lg border border-zinc-800/50 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-zinc-400">Tomticket Ok</span>
            </div>
            <div className="p-2 bg-zinc-950/50 rounded-lg border border-zinc-800/50 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-zinc-400">Pendente</span>
            </div>
          </div>
        </div>

        {/* Card Ranking de Analistas (Clicável) */}
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex flex-col justify-between space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              <h3 className="text-sm font-semibold text-zinc-200">Atendimentos por Analista / Suporte</h3>
            </div>
            <span className="text-[11px] text-zinc-500">Clique para filtrar na tabela</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-1">
            {!metricsData?.porAnalista || metricsData.porAnalista.length === 0 ? (
              <p className="text-xs text-zinc-500 col-span-2 text-center py-4">Nenhum analista com atendimentos no período.</p>
            ) : (
              metricsData.porAnalista.map((item) => {
                const pct = m.total > 0 ? Math.round((item.totalAtendimentos / m.total) * 100) : 0;
                const isSelected = analista.toLowerCase() === item.analista.toLowerCase();

                return (
                  <div 
                    key={item.analista}
                    onClick={() => selectAnalistaFilter(item.analista)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-indigo-500/10 border-indigo-500/50" 
                        : "bg-zinc-950/40 border-zinc-800/60 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-200 font-medium truncate">{item.analista}</span>
                      <span className="text-zinc-400 font-semibold">{item.totalAtendimentos} tickets</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="bg-emerald-500 h-full rounded-full" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 🟢 BARRA DE FILTROS AVANÇADOS */}
      <form 
        onSubmit={handleFilterSubmit} 
        className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col lg:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <Search size={14} /> Busca Geral
          </label>
          <input
            type="text"
            placeholder="Protocolo, CNPJ, Cliente ou Ticket..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-48 space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <UserCheck size={14} /> Analista / Atendente
          </label>
          <input
            type="text"
            placeholder="Nome do analista..."
            value={analista}
            onChange={(e) => setAnalista(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-40 space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <Filter size={14} /> Integração
          </label>
          <select
            value={sincronizado}
            onChange={(e) => {
              setSincronizado(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Todos os Status</option>
            <option value="true">Sincronizados</option>
            <option value="false">Pendentes</option>
          </select>
        </div>

        <div className="w-full lg:w-36 space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <Calendar size={14} /> De
          </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36 space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <Calendar size={14} /> Até
          </label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <button
            type="submit"
            className="flex-1 lg:flex-none px-5 py-2 bg-zinc-100 text-zinc-950 rounded-lg text-sm font-semibold hover:bg-white transition-all active:scale-95 shrink-0"
          >
            Filtrar
          </button>
          
          {(busca || analista || sincronizado || dataInicio || dataFim) && (
            <button
              type="button"
              onClick={handleClearFilters}
              title="Limpar filtros"
              className="p-2 bg-zinc-800 text-zinc-400 hover:text-red-400 rounded-lg border border-zinc-700/80 transition-all"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>
      </form>

      {/* 🟢 TABELA DE ATENDIMENTOS */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-xs text-zinc-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3.5">Protocolo</th>
                <th className="px-4 py-3.5">Cliente / Razão Social</th>
                <th className="px-4 py-3.5">CNPJ</th>
                <th className="px-4 py-3.5">Ticket ZPro</th>
                <th className="px-4 py-3.5">Ticket Tomticket</th>
                <th className="px-4 py-3.5">Atendente</th>
                <th className="px-4 py-3.5 text-center">Status Sinc.</th>
                <th className="px-4 py-3.5 text-right">Data/Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-zinc-500">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 opacity-50" />
                    Carregando atendimentos...
                  </td>
                </tr>
              ) : atendimentos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-zinc-500">
                    Nenhum atendimento localizado com os parâmetros informados.
                  </td>
                </tr>
              ) : (
                atendimentos.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-zinc-200">
                      {item.protocolo || "N/A"}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-zinc-100">
                      {item.nomeContato || "Contato Não Identificado"}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-zinc-400">
                      {item.cnpj}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-400 font-mono text-xs">
                      {item.ticketZpro ? `#${item.ticketZpro}` : "-"}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-400 font-mono text-xs">
                      {item.ticketTomticket ? `#${item.ticketTomticket}` : "-"}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-300">
                      {item.atendente || <span className="text-zinc-600 italic">Aguardando</span>}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {item.sincronizado ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Sincronizado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-xs text-zinc-500">
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🟢 PAGINAÇÃO */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-zinc-900/80 border-t border-zinc-800/80 text-xs text-zinc-400 gap-3">
            <div>
              Exibindo página <strong className="text-zinc-200">{pagination.currentPage}</strong> de{" "}
              <strong className="text-zinc-200">{pagination.totalPages}</strong> ({pagination.totalRecords} registros totais)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={!pagination.hasPrevPage || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700/80 rounded-md text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={14} /> Anterior
              </button>
              <button
                disabled={!pagination.hasNextPage || loading}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700/80 rounded-md text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Próxima <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}