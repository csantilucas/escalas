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
import { formatarDataHora } from "@/lib/dateUtils";

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
    <div className="p-4 max-w-[1600px] mx-auto space-y-4 text-zinc-100 font-sans antialiased text-left">
      {/* 🟢 CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-base font-bold tracking-tight text-zinc-100">
            Painel Geral de Atendimentos
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Métricas consolidadas e relatórios operacionais Z-PRO & Tomticket.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Atualizar Dados
        </button>
      </div>

      {/* 🟢 BLOCOS DE CARDS KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Total Registrados</p>
            <p className="text-xl font-bold text-zinc-100">{m.total}</p>
            <span className="text-[10px] text-zinc-500">Base filtrada</span>
          </div>
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
            <Layers size={18} />
          </div>
        </div>

        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Sincronizados (Tomticket)</p>
            <p className="text-xl font-bold text-emerald-400">{m.sincronizados}</p>
            <span className="text-[10px] text-emerald-500/80">Com suporte atrelado</span>
          </div>
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Pendentes (Somente ZPro)</p>
            <p className="text-xl font-bold text-amber-400">{m.pendentes}</p>
            <span className="text-[10px] text-amber-500/80">Aguardando espelhamento</span>
          </div>
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
            <Clock size={18} />
          </div>
        </div>

        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between shadow-xs">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Criados Hoje</p>
            <p className="text-xl font-bold text-blue-400">{m.criadosHoje}</p>
            <span className="text-[10px] text-zinc-500">Entradas no dia</span>
          </div>
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      {/* 🟢 GRÁFICOS & RANKING DE ANALISTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Card Taxa de Integração */}
        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex flex-col justify-between space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-1.5">
              <PieChart size={15} className="text-blue-400" />
              <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Taxa de Integração</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
              {m.taxaSincronizacao}%
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>Sincronizados ({m.sincronizados})</span>
              <span>Pendentes ({m.pendentes})</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex p-0.5">
              <div 
                style={{ width: `${m.taxaSincronizacao}%` }} 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-1.5 bg-zinc-950 rounded-md border border-zinc-800 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-400">Tomticket Ok</span>
            </div>
            <div className="p-1.5 bg-zinc-950 rounded-md border border-zinc-800 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-zinc-400">Pendente</span>
            </div>
          </div>
        </div>

        {/* Card Ranking de Analistas */}
        <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex flex-col justify-between space-y-2.5 lg:col-span-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-blue-400" />
              <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Atendimentos por Analista</h3>
            </div>
            <span className="text-[10px] text-zinc-500">Clique para filtrar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
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
                    className={`p-2 rounded-md border cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-blue-500/10 border-blue-500/40" 
                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-200 font-medium truncate">{item.analista}</span>
                      <span className="text-zinc-400 font-semibold">{item.totalAtendimentos} tickets</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="bg-blue-500 h-full rounded-full" />
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
        className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg flex flex-col lg:flex-row gap-2.5 items-end shadow-xs"
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Search size={12} /> Busca Geral
          </label>
          <input
            type="text"
            placeholder="Protocolo, CNPJ, Cliente ou Ticket..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-44 space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <UserCheck size={12} /> Analista
          </label>
          <input
            type="text"
            placeholder="Nome do analista..."
            value={analista}
            onChange={(e) => setAnalista(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36 space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Filter size={12} /> Integração
          </label>
          <select
            value={sincronizado}
            onChange={(e) => {
              setSincronizado(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Todos</option>
            <option value="true">Sincronizados</option>
            <option value="false">Pendentes</option>
          </select>
        </div>

        <div className="w-full lg:w-32 space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Calendar size={12} /> De
          </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="w-full lg:w-32 space-y-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
            <Calendar size={12} /> Até
          </label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex gap-1.5 w-full lg:w-auto">
          <button
            type="submit"
            className="flex-1 lg:flex-none px-4 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-500 transition-all cursor-pointer shadow-xs"
          >
            Filtrar
          </button>
          
          {(busca || analista || sincronizado || dataInicio || dataFim) && (
            <button
              type="button"
              onClick={handleClearFilters}
              title="Limpar filtros"
              className="p-1.5 bg-zinc-800 text-zinc-400 hover:text-red-400 rounded-md border border-zinc-700 transition-all cursor-pointer"
            >
              <XCircle size={15} />
            </button>
          )}
        </div>
      </form>

      {/* 🟢 TABELA DE ATENDIMENTOS */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/70 border-b border-zinc-800 text-[11px] text-zinc-400 uppercase font-semibold">
              <tr>
                <th className="px-3.5 py-2.5">Protocolo</th>
                <th className="px-3.5 py-2.5">Cliente / Razão Social</th>
                <th className="px-3.5 py-2.5">CNPJ</th>
                <th className="px-3.5 py-2.5">Ticket Z-PRO</th>
                <th className="px-3.5 py-2.5">Ticket Tomticket</th>
                <th className="px-3.5 py-2.5">Atendente</th>
                <th className="px-3.5 py-2.5 text-center">Status</th>
                <th className="px-3.5 py-2.5 text-right">Data/Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-zinc-500">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-1.5 opacity-50" />
                    Carregando atendimentos...
                  </td>
                </tr>
              ) : atendimentos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-zinc-500">
                    Nenhum atendimento localizado com os parâmetros informados.
                  </td>
                </tr>
              ) : (
                atendimentos.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono font-semibold text-zinc-200">
                      {item.protocolo || "N/A"}
                    </td>
                    <td className="px-3.5 py-2.5 font-medium text-zinc-100">
                      {item.nomeContato || "Contato Não Identificado"}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono text-zinc-400">
                      {item.cnpj}
                    </td>
                    <td className="px-3.5 py-2.5 text-zinc-400 font-mono">
                      {item.ticketZpro ? `#${item.ticketZpro}` : "-"}
                    </td>
                    <td className="px-3.5 py-2.5 text-zinc-400 font-mono">
                      {item.ticketTomticket ? `#${item.ticketTomticket}` : "-"}
                    </td>
                    <td className="px-3.5 py-2.5 text-zinc-300">
                      {item.atendente || <span className="text-zinc-600 italic">Aguardando</span>}
                    </td>
                    <td className="px-3.5 py-2.5 text-center">
                      {item.sincronizado ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Sincronizado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono text-zinc-500">
                      {formatarDataHora(item.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🟢 PAGINAÇÃO */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-3.5 py-2.5 bg-zinc-900/60 border-t border-zinc-800 text-xs text-zinc-400 gap-2">
            <div>
              Página <strong className="text-zinc-200">{pagination.currentPage}</strong> de{" "}
              <strong className="text-zinc-200">{pagination.totalPages}</strong> ({pagination.totalRecords} registros)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={!pagination.hasPrevPage || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft size={13} /> Anterior
              </button>
              <button
                disabled={!pagination.hasNextPage || loading}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Próxima <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}