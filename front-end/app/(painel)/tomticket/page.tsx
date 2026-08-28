// src/app/tomticket/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { dashboardService, RelatorioTomticket } from "@/services/dashboardService";
import { 
  RefreshCw, 
  Printer, 
  Search, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Ticket, 
  MessageSquare,
  FileSpreadsheet,
  FileText
} from "lucide-react";

// Bibliotecas de Exportação
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Chart.js Setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function TomticketPage() {
  // 🟢 1. DATAS INICIAM VAZIAS
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [rawData, setRawData] = useState<RelatorioTomticket[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado para controlar qual linha está expandida (Gaveta)
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Estados dos Filtros
  const [filtroOperador, setFiltroOperador] = useState("ALL");
  const [filtroBusca, setFiltroBusca] = useState("");

  // 🟢 2. CARREGAR / SINCRONIZAR DADOS
  const loadData = async (forceRefresh = false) => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione as datas de início e fim para gerar o relatório.");
      return;
    }

    setLoading(true);
    try {
      const result = await dashboardService.getTomticketReport(startDate, endDate, forceRefresh);
      setRawData(result || []);
    } catch (err) {
      console.error("Erro ao carregar dados do Tomticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (operatorId: string) => {
    setExpandedUser(expandedUser === operatorId ? null : operatorId);
  };

  // CÁLCULO DOS KPIS GLOBAIS
  const kpis = useMemo(() => {
    let totalChamados = 0;
    let totalAvaliados = 0;
    let somaNotas = 0;
    let somaTempoMinutos = 0;

    rawData.forEach((u) => {
      totalChamados += u.quantidade_protocolos;
      totalAvaliados += u.chats_com_evaluation;
      somaNotas += Number(u.media_avaliacao) * u.chats_com_evaluation;
      somaTempoMinutos += u.tempo_medio_minutos * u.quantidade_protocolos;
    });

    const mediaGeralSatisfacao =
      totalAvaliados > 0 ? (somaNotas / totalAvaliados).toFixed(2) : "0.00";
    const tempoMedioEquipe =
      totalChamados > 0 ? Math.round(somaTempoMinutos / totalChamados) : 0;

    return {
      totalChamados,
      totalAvaliados,
      mediaGeralSatisfacao,
      tempoMedioEquipe,
    };
  }, [rawData]);

  // FILTRAGEM DE DADOS DA TABELA
  const dadosFiltrados = useMemo(() => {
    return rawData
      .filter((u) => u.quantidade_protocolos > 0)
      .filter((u) => {
        const matchOperador =
          filtroOperador === "ALL" || u.nome_usuario === filtroOperador;
        const buscaLower = filtroBusca.toLowerCase();
        const matchBusca =
          u.nome_usuario.toLowerCase().includes(buscaLower) ||
          u.categorias_atendidas.some((c) => c.toLowerCase().includes(buscaLower));

        return matchOperador && matchBusca;
      })
      .sort((a, b) => b.quantidade_protocolos - a.quantidade_protocolos);
  }, [rawData, filtroOperador, filtroBusca]);

  // CONFIGURAÇÃO DOS GRÁFICOS
  const chartDataBar = useMemo(() => {
    const ops = rawData
      .filter((u) => u.quantidade_protocolos > 0)
      .sort((a, b) => b.quantidade_protocolos - a.quantidade_protocolos);

    return {
      labels: ops.map((u) => u.nome_usuario.split(" ")[0]),
      datasets: [
        {
          label: "Total de Chamados",
          data: ops.map((u) => u.quantidade_protocolos),
          backgroundColor: "#3b82f6",
          borderRadius: 4,
        },
        {
          label: "Chamados Avaliados",
          data: ops.map((u) => u.chats_com_evaluation),
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
      ],
    };
  }, [rawData]);

  const chartDataDoughnut = useMemo(() => {
    let g5 = 0, g4 = 0, g3 = 0, g2 = 0, g1 = 0;
    rawData.forEach((u) => {
      if (u.evaluations) {
        g5 += u.evaluations.nota_5 || 0;
        g4 += u.evaluations.nota_4 || 0;
        g3 += u.evaluations.nota_3 || 0;
        g2 += u.evaluations.nota_2 || 0;
        g1 += u.evaluations.nota_1 || 0;
      }
    });

    return {
      labels: ["Nota 5", "Nota 4", "Nota 3", "Nota 2", "Nota 1"],
      datasets: [
        {
          data: [g5, g4, g3, g2, g1],
          backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#7f1d1d"],
          borderWidth: 0,
        },
      ],
    };
  }, [rawData]);

  const chartOptionsDark = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#a1a1aa", font: { size: 11 } },
      },
    },
    scales: {
      x: { ticks: { color: "#71717a" }, grid: { color: "#27272a" } },
      y: { ticks: { color: "#71717a" }, grid: { color: "#27272a" } },
    },
  };

  // EXPORTAR EXCEL COMPLETO (3 ABAS)
  const exportarExcel = () => {
    if (!dadosFiltrados || dadosFiltrados.length === 0) {
      alert("Não há dados carregados para exportar.");
      return;
    }

    const workbook = XLSX.utils.book_new();

    // ABA 1: ANALISTAS
    const dadosAnalistas = dadosFiltrados.map((u) => ({
      "Analista / Operador": u.nome_usuario,
      "ID Operador": u.operator_id,
      "Total Chamados": u.quantidade_protocolos,
      "Avaliados": u.chats_com_evaluation,
      "Sem Nota": u.chats_sem_evaluation,
      "Média Nota (NPS)": u.media_avaliacao,
      "Nota 5": u.evaluations?.nota_5 || 0,
      "Nota 4": u.evaluations?.nota_4 || 0,
      "Nota 3": u.evaluations?.nota_3 || 0,
      "Nota 2": u.evaluations?.nota_2 || 0,
      "Nota 1": u.evaluations?.nota_1 || 0,
      "Tempo Médio (min)": u.tempo_medio_minutos,
      "Categorias Atendidas": u.categorias_atendidas?.join(", ") || "Geral",
    }));

    const sheetAnalistas = XLSX.utils.json_to_sheet(dadosAnalistas);
    XLSX.utils.book_append_sheet(workbook, sheetAnalistas, "Desempenho Analistas");

    // ABA 2: CLIENTES
    const porCliente: Record<string, { total: number; avaliados: number; somaNotas: number; notas: Record<number, number> }> = {};

    dadosFiltrados.forEach((u) => {
      u.clientes_atendidos?.forEach((cli) => {
        const nomeCliente = cli.nome || "Não identificado";
        if (!porCliente[nomeCliente]) {
          porCliente[nomeCliente] = { total: 0, avaliados: 0, somaNotas: 0, notas: {} };
        }
        porCliente[nomeCliente].total++;
        if (cli.nota !== null && cli.nota !== undefined) {
          porCliente[nomeCliente].avaliados++;
          porCliente[nomeCliente].somaNotas += Number(cli.nota);
          porCliente[nomeCliente].notas[cli.nota] = (porCliente[nomeCliente].notas[cli.nota] || 0) + 1;
        }
      });
    });

    const dadosClientes = Object.keys(porCliente).map((cliName) => {
      const c = porCliente[cliName];
      const media = c.avaliados > 0 ? (c.somaNotas / c.avaliados).toFixed(2) : "N/A";
      const hist = c.avaliados > 0
        ? Object.keys(c.notas)
            .sort((a, b) => Number(b) - Number(a))
            .map((n) => `Nota ${n}: ${c.notas[Number(n)]}`)
            .join(" | ")
        : "Sem avaliação";

      return {
        "Razão Social / Cliente": cliName,
        "Total Chamados": c.total,
        "Atendimentos Avaliados": c.avaliados,
        "Média Nota": media,
        "Histograma de Notas": hist,
      };
    });

    const sheetClientes = XLSX.utils.json_to_sheet(dadosClientes);
    XLSX.utils.book_append_sheet(workbook, sheetClientes, "Satisfação por Cliente");

    // ABA 3: CATEGORIAS
    const porCategoria: Record<string, number> = {};
    dadosFiltrados.forEach((u) => {
      u.categorias_atendidas?.forEach((cat) => {
        porCategoria[cat] = (porCategoria[cat] || 0) + 1;
      });
    });

    const totalVolumeCategorias = Object.values(porCategoria).reduce((a, b) => a + b, 0);

    const dadosCategorias = Object.keys(porCategoria)
      .sort((a, b) => porCategoria[b] - porCategoria[a])
      .map((catName) => {
        const qtd = porCategoria[catName];
        const pct = totalVolumeCategorias > 0 ? ((qtd / totalVolumeCategorias) * 100).toFixed(1) : "0.0";
        return {
          "Categoria de Atendimento": catName,
          "Volume / Ocorrências": qtd,
          "% Representatividade": `${pct}%`,
        };
      });

    const sheetCategorias = XLSX.utils.json_to_sheet(dadosCategorias);
    XLSX.utils.book_append_sheet(workbook, sheetCategorias, "Volume por Categoria");

    XLSX.writeFile(workbook, `relatorio_completo_tomticket_${startDate}_a_${endDate}.xlsx`);
  };

  // EXPORTAR PDF COMPLETO
  const exportarPDF = () => {
    if (!dadosFiltrados || dadosFiltrados.length === 0) {
      alert("Não há dados carregados para exportar.");
      return;
    }

    const doc = new jsPDF("landscape");

    doc.setFontSize(14);
    doc.text("Dashboard Analítico de Atendimentos - Tomticket", 14, 15);
    doc.setFontSize(9);
    doc.text(`Período: ${startDate} até ${endDate} | Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 21);

    const colsEquipe = [
      "Operador",
      "Total Chamados",
      "Avaliados",
      "Sem Nota",
      "Média (NPS)",
      "Distribuição Notas (5/4/3/2/1)",
      "Tempo Médio",
    ];

    const rowsEquipe = dadosFiltrados.map((u) => [
      u.nome_usuario,
      u.quantidade_protocolos,
      u.chats_com_evaluation,
      u.chats_sem_evaluation,
      u.media_avaliacao,
      `${u.evaluations?.nota_5 || 0} / ${u.evaluations?.nota_4 || 0} / ${u.evaluations?.nota_3 || 0} / ${u.evaluations?.nota_2 || 0} / ${u.evaluations?.nota_1 || 0}`,
      `${u.tempo_medio_minutos} min`,
    ]);

    autoTable(doc, {
      head: [colsEquipe],
      body: rowsEquipe,
      startY: 26,
      theme: "grid",
      headStyles: { fillColor: [24, 24, 27] },
      styles: { fontSize: 8 },
    });

    // CLIENTES
    const porCliente: Record<string, { total: number; avaliados: number; somaNotas: number; notas: Record<number, number> }> = {};

    dadosFiltrados.forEach((u) => {
      u.clientes_atendidos?.forEach((cli) => {
        const nomeCliente = cli.nome || "Não identificado";
        if (!porCliente[nomeCliente]) {
          porCliente[nomeCliente] = { total: 0, avaliados: 0, somaNotas: 0, notas: {} };
        }
        porCliente[nomeCliente].total++;
        if (cli.nota !== null && cli.nota !== undefined) {
          porCliente[nomeCliente].avaliados++;
          porCliente[nomeCliente].somaNotas += Number(cli.nota);
          porCliente[nomeCliente].notas[cli.nota] = (porCliente[nomeCliente].notas[cli.nota] || 0) + 1;
        }
      });
    });

    const colsClientes = ["Razão Social / Cliente", "Total Chamados", "Avaliados", "Média Nota", "Histograma de Notas"];
    const rowsClientes = Object.keys(porCliente).map((cliName) => {
      const c = porCliente[cliName];
      const media = c.avaliados > 0 ? (c.somaNotas / c.avaliados).toFixed(2) : "N/A";
      const hist = c.avaliados > 0
        ? Object.keys(c.notas)
            .sort((a, b) => Number(b) - Number(a))
            .map((n) => `Nota ${n}: ${c.notas[Number(n)]}`)
            .join(" | ")
        : "Sem avaliação";

      return [cliName, c.total, c.avaliados, media, hist];
    });

    let lastY = (doc as any).lastAutoTable.finalY + 10;

    if (lastY > 160) {
      doc.addPage();
      lastY = 15;
    }

    doc.setFontSize(11);
    doc.text("Satisfação por Cliente", 14, lastY);

    autoTable(doc, {
      head: [colsClientes],
      body: rowsClientes,
      startY: lastY + 4,
      theme: "grid",
      headStyles: { fillColor: [30, 58, 138] },
      styles: { fontSize: 8 },
    });

    // CATEGORIAS
    const porCategoria: Record<string, number> = {};
    dadosFiltrados.forEach((u) => {
      u.categorias_atendidas?.forEach((cat) => {
        porCategoria[cat] = (porCategoria[cat] || 0) + 1;
      });
    });

    const colsCat = ["Categoria de Atendimento", "Ocorrências", "% Representatividade"];
    const totalVolumeCategorias = Object.values(porCategoria).reduce((a, b) => a + b, 0);

    const rowsCat = Object.keys(porCategoria)
      .sort((a, b) => porCategoria[b] - porCategoria[a])
      .map((catName) => {
        const qtd = porCategoria[catName];
        const pct = totalVolumeCategorias > 0 ? ((qtd / totalVolumeCategorias) * 100).toFixed(1) : "0.0";
        return [catName, qtd, `${pct}%`];
      });

    let lastY2 = (doc as any).lastAutoTable.finalY + 10;

    if (lastY2 > 160) {
      doc.addPage();
      lastY2 = 15;
    }

    doc.setFontSize(11);
    doc.text("Volume por Categoria Atendida", 14, lastY2);

    autoTable(doc, {
      head: [colsCat],
      body: rowsCat,
      startY: lastY2 + 4,
      theme: "grid",
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 8 },
    });

    doc.save(`relatorio_completo_tomticket_${startDate}_a_${endDate}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6 text-zinc-100 font-sans p-2 md:p-4">
      {/* HEADER COM BOTÕES DE EXPORTAÇÃO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">Dashboard Analítico de Atendimentos</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {startDate && endDate 
              ? `Período: ${startDate} até ${endDate} | Gerado em: ${new Date().toLocaleDateString("pt-BR")}`
              : "Selecione o período e clique em Sincronizar para gerar o relatório."
            }
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-medium text-xs transition-all active:scale-95 shrink-0"
          >
            <FileSpreadsheet size={14} /> Excel Completo
          </button>

          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-lg font-medium text-xs transition-all active:scale-95 shrink-0"
          >
            <FileText size={14} /> PDF Completo
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-lg font-medium text-xs transition-all active:scale-95 shrink-0"
          >
            <Printer size={14} /> Imprimir
          </button>
        </div>
      </div>

      {/* FILTROS E DATAS */}
      <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 flex flex-wrap gap-4 items-end justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Data Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-zinc-200 outline-none focus:border-zinc-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Data Fim</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-zinc-200 outline-none focus:border-zinc-700"
            />
          </div>

          <button
            onClick={() => loadData(false)}
            disabled={loading}
            className="mt-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium px-4 py-2 rounded-lg transition-all"
          >
            Buscar
          </button>

          <button
            onClick={() => loadData(true)}
            disabled={loading}
            className="mt-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Sincronizando..." : "Sincronizar Tomticket"}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 flex-1 max-w-xl">
          <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Filtrar Operador</label>
            <select
              value={filtroOperador}
              onChange={(e) => setFiltroOperador(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-zinc-200 outline-none focus:border-zinc-700"
            >
              <option value="ALL">Todos os Operadores</option>
              {rawData
                .filter((u) => u.quantidade_protocolos > 0)
                .map((u) => (
                  <option key={u.operator_id} value={u.nome_usuario}>
                    {u.nome_usuario}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Pesquisar</label>
            <div className="relative">
              <input
                type="text"
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
                placeholder="Nome ou Categoria..."
                className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 pl-8 rounded-lg text-zinc-200 outline-none focus:border-zinc-700"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
            </div>
          </div>
        </div>
      </div>

      {/* AVISO QUANDO NENHUM DADO FOI CARREGADO AINDA */}
      {!loading && rawData.length === 0 && (
        <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-xs">
          Selecione o período de datas acima e clique em <strong className="text-blue-400 font-semibold">Sincronizar Tomticket</strong> ou <strong className="text-zinc-300 font-semibold">Buscar</strong> para gerar o relatório.
        </div>
      )}

      {/* KPIS GLOBAIS */}
      {rawData.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Atendimentos</span>
              <div className="text-2xl font-bold text-zinc-100 mt-2">{kpis.totalChamados}</div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Atendimentos Avaliados</span>
              <div className="text-2xl font-bold text-zinc-100 mt-2">{kpis.totalAvaliados}</div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Satisfação Média (NPS)</span>
              <div className="text-2xl font-bold text-amber-400 mt-2 flex items-baseline gap-1">
                <Star size={18} fill="currentColor" className="self-center" /> {kpis.mediaGeralSatisfacao}
                <span className="text-xs text-zinc-500 font-normal">/ 5.0</span>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Tempo Médio Global</span>
              <div className="text-2xl font-bold text-zinc-100 mt-2 flex items-baseline gap-1">
                {kpis.tempoMedioEquipe} <span className="text-xs text-zinc-500 font-normal">min</span>
              </div>
            </div>
          </div>

          {/* GRÁFICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-800/60 mb-4">
                Volume de Atendimentos por Operador
              </h3>
              <div className="h-60 flex items-center justify-center">
                <Bar data={chartDataBar} options={chartOptionsDark} />
              </div>
            </div>

            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-800/60 mb-4">
                Distribuição Global de Notas
              </h3>
              <div className="h-60 flex items-center justify-center">
                <Doughnut data={chartDataDoughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#a1a1aa' } } } }} />
              </div>
            </div>
          </div>

          {/* TABELA DE DESEMPENHO */}
          <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 border-collapse table-fixed min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800/80 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="p-3.5 w-10"></th>
                    <th className="p-3.5 w-48">Operador / Analista</th>
                    <th className="p-3.5 text-center w-28">Total Chamados</th>
                    <th className="p-3.5 text-center w-36">Avaliados / Sem Nota</th>
                    <th className="p-3.5 text-center w-28">Média Nota</th>
                    <th className="p-3.5 w-52">Distribuição das Notas</th>
                    <th className="p-3.5 text-center w-28">Tempo Médio</th>
                    <th className="p-3.5">Principais Categorias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {dadosFiltrados.map((u, idx) => {
                    const ev = u.evaluations || {};
                    const isExpanded = expandedUser === u.operator_id;

                    let scoreBadgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                    if (u.media_avaliacao >= 4) scoreBadgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                    else if (u.media_avaliacao < 3) scoreBadgeClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";

                    return (
                      <React.Fragment key={`${u.operator_id}-${idx}`}>
                        <tr 
                          onClick={() => toggleExpand(u.operator_id)}
                          className={`hover:bg-zinc-800/40 cursor-pointer transition-colors ${isExpanded ? "bg-zinc-800/50" : ""}`}
                        >
                          <td className="p-3.5 text-center text-zinc-500">
                            {isExpanded ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} />}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-200 font-bold text-xs flex items-center justify-center border border-zinc-700/80 shrink-0">
                                {u.nome_usuario.charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <strong className="block font-medium text-zinc-100 truncate">{u.nome_usuario}</strong>
                                <small className="text-[10px] text-zinc-500 truncate block">ID: {u.operator_id.substring(0, 8)}...</small>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 text-center font-bold text-zinc-200">{u.quantidade_protocolos}</td>

                          <td className="p-3.5 text-center text-zinc-400 font-medium">
                            {u.chats_com_evaluation} / {u.chats_sem_evaluation}
                          </td>

                          <td className="p-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs border ${scoreBadgeClass}`}>
                              {u.media_avaliacao}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <div className="flex flex-wrap gap-1">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                                5: {ev.nota_5 || 0}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-950/60 text-blue-400 border border-blue-800/50">
                                4: {ev.nota_4 || 0}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/50">
                                3: {ev.nota_3 || 0}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-950/60 text-rose-400 border border-rose-800/50">
                                2: {ev.nota_2 || 0}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-950/80 text-red-500 border border-red-900/50">
                                1: {ev.nota_1 || 0}
                              </span>
                            </div>
                          </td>

                          <td className="p-3.5 text-center font-bold text-zinc-200">{u.tempo_medio_minutos} min</td>

                          <td className="p-3.5">
                            {u.categorias_atendidas && u.categorias_atendidas.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {u.categorias_atendidas.slice(0, 3).map((cat, i) => (
                                  <span key={i} className="bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded text-[10px] font-medium border border-zinc-700/60 truncate max-w-[120px]">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-zinc-600 italic text-[10px]">Geral</span>
                            )}
                          </td>
                        </tr>

                        {/* GAVETA EXPANSÍVEL */}
                        {isExpanded && (
                          <tr className="bg-zinc-950/90 border-b border-zinc-800">
                            <td colSpan={8} className="p-4 md:p-6">
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap items-center justify-between border-b border-zinc-800/80 pb-3 gap-2">
                                  <h4 className="font-semibold text-zinc-200 text-xs flex items-center gap-2">
                                    <User size={15} className="text-blue-400 shrink-0" />
                                    Detalhamento do Analista: <span className="text-zinc-100 font-bold">{u.nome_usuario}</span>
                                  </h4>
                                  <span className="text-[10px] text-zinc-500 font-mono">ID Tomticket: {u.operator_id}</span>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                                  {/* CLIENTES ATENDIDOS */}
                                  <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80 flex flex-col justify-between h-full min-w-0">
                                    <div className="flex flex-col gap-3">
                                      <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between border-b border-zinc-800/60 pb-2">
                                        <span className="flex items-center gap-2">
                                          <MessageSquare size={13} className="text-blue-400 shrink-0" />
                                          Clientes Atendidos
                                        </span>
                                        <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                                          {u.clientes_atendidos?.length || 0}
                                        </span>
                                      </h5>

                                      <div className="max-h-[520px] overflow-y-auto pr-1 flex flex-col gap-1.5 custom-scrollbar">
                                        {u.clientes_atendidos && u.clientes_atendidos.length > 0 ? (
                                          u.clientes_atendidos.map((cli, cIdx) => (
                                            <div key={cIdx} className="flex items-center justify-between gap-3 text-xs p-2.5 bg-zinc-900/90 hover:bg-zinc-800/50 rounded border border-zinc-800/60 transition-colors min-w-0">
                                              <span className="font-medium text-zinc-300 truncate min-w-0 flex-1">
                                                {cli.nome}
                                              </span>

                                              {cli.nota !== null ? (
                                                <span className="flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px] shrink-0">
                                                  <Star size={10} fill="currentColor" /> {cli.nota}
                                                </span>
                                              ) : (
                                                <span className="text-[10px] text-zinc-600 italic shrink-0">Sem Nota</span>
                                              )}
                                            </div>
                                          ))
                                        ) : (
                                          <p className="text-xs text-zinc-600 italic p-2">Nenhum cliente registrado no período.</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* PROTOCOLOS E CATEGORIAS */}
                                  <div className="flex flex-col gap-4 min-w-0 justify-between">
                                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80 flex flex-col gap-3 min-w-0">
                                      <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between border-b border-zinc-800/60 pb-2">
                                        <span className="flex items-center gap-2">
                                          <Ticket size={13} className="text-blue-400 shrink-0" />
                                          Protocolos Gerados
                                        </span>
                                        <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                                          {u.protocolos?.length || 0}
                                        </span>
                                      </h5>

                                      <div className="max-h-44 overflow-y-auto flex flex-wrap gap-1.5 p-0.5 custom-scrollbar">
                                        {u.protocolos && u.protocolos.length > 0 ? (
                                          u.protocolos.map((prot, pIdx) => (
                                            <span key={pIdx} className="font-mono text-[10px] bg-zinc-900 text-zinc-300 px-2 py-1 rounded border border-zinc-800 shrink-0">
                                              #{prot}
                                            </span>
                                          ))
                                        ) : (
                                          <p className="text-xs text-zinc-600 italic">Nenhum protocolo gerado.</p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80 flex flex-col gap-2.5 min-w-0 flex-1">
                                      <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800/60 pb-2">
                                        Todas as Categorias Atendidas
                                      </h5>
                                      <div className="flex flex-wrap gap-1.5 pt-1">
                                        {u.categorias_atendidas && u.categorias_atendidas.length > 0 ? (
                                          u.categorias_atendidas.map((cat, catIdx) => (
                                            <span key={catIdx} className="bg-blue-950/40 text-blue-300 text-[10px] font-medium px-2 py-1 rounded border border-blue-800/50">
                                              {cat}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-xs text-zinc-600 italic">Geral</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}