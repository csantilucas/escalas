"use client";

import { useEffect, useState, useMemo } from "react";
import { registroService, userService, UserItem } from "@/services";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Upload,
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  Printer,
  Table,
  Sparkles,
  Users,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RelatoriosEscalasPage() {
  const [escalas, setEscalas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filtros
  const [mesAno, setMesAno] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [filtroUsuario, setFiltroUsuario] = useState("ALL");

  // Estados de Importação em Lote
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importing, setImporting] = useState(false);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [escalasRes, usersRes] = await Promise.all([
        registroService.list(1),
        userService.listAll(),
      ]);

      if (escalasRes && escalasRes.registros) {
        setEscalas(escalasRes.registros);
      }
      if (usersRes) {
        setUsuarios(usersRes);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "Erro ao carregar dados de escalas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Escalas filtradas
  const escalasFiltradas = useMemo(() => {
    return escalas.filter((esc) => {
      const dataEscala = (esc.data || esc.startTime || "").substring(0, 7);
      const matchesMes = mesAno ? dataEscala === mesAno : true;
      const matchesUser = filtroUsuario === "ALL" ? true : esc.user_id === filtroUsuario;
      return matchesMes && matchesUser;
    });
  }, [escalas, mesAno, filtroUsuario]);

  // Exportar Excel
  const exportarExcel = () => {
    if (escalasFiltradas.length === 0) {
      alert("Nenhum registro de escala disponível para exportação no período selecionado.");
      return;
    }

    const rows = escalasFiltradas.map((e, index) => ({
      "Nº": index + 1,
      "Data": new Date(e.data || e.startTime).toLocaleDateString("pt-BR"),
      "Dia da Semana": new Date(e.data || e.startTime).toLocaleDateString("pt-BR", { weekday: "long" }),
      "Plantonista": e.user?.name || "Não informado",
      "E-mail": e.user?.email || "-",
      "ID Atendente": e.user?.id_atendente || "-",
      "Hora Início": e.startTime ? new Date(e.startTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "08:00",
      "Hora Fim": e.endTime ? new Date(e.endTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "18:00",
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Escalas");
    XLSX.writeFile(wb, `escala_plantao_${mesAno}.xlsx`);
    setSuccessMsg("Planilha Excel gerada com sucesso!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Exportar PDF
  const exportarPDF = () => {
    if (escalasFiltradas.length === 0) {
      alert("Nenhum registro de escala disponível para exportação no período selecionado.");
      return;
    }

    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text("Cronograma Oficial de Plantões e Escalas", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Período de Referência: ${mesAno} | Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 27);

    const tableData = escalasFiltradas.map((e, index) => [
      index + 1,
      new Date(e.data || e.startTime).toLocaleDateString("pt-BR"),
      new Date(e.data || e.startTime).toLocaleDateString("pt-BR", { weekday: "short" }),
      e.user?.name || "Não informado",
      e.startTime ? new Date(e.startTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "08:00",
      e.endTime ? new Date(e.endTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "18:00",
      "Assinatura: __________________",
    ]);

    autoTable(doc, {
      startY: 33,
      head: [["#", "Data", "Dia", "Plantonista", "Início", "Fim", "Visto / Confirmação"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 8, cellPadding: 3 },
    });

    doc.save(`escala_plantao_${mesAno}.pdf`);
    setSuccessMsg("Documento PDF gerado com sucesso!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Processar Importação em Lote
  const handleProcessarImportacao = async () => {
    if (!importText.trim()) {
      alert("Insira as linhas de escala para importação.");
      return;
    }

    try {
      setImporting(true);
      setErrorMsg(null);

      const linhas = importText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      let sucessoCount = 0;

      for (const linha of linhas) {
        // Formato esperado: Data; EmailOuNome; HoraInicio; HoraFim (ex: 2026-09-01; lucas@gmail.com; 08:00; 18:00)
        const partes = linha.split(/[;,]/).map((p) => p.trim());
        if (partes.length >= 2) {
          const dataStr = partes[0];
          const userIdentifier = partes[1];
          const horaIni = partes[2] || "08:00";
          const horaFim = partes[3] || "18:00";

          // Encontra usuário correspondente
          const u = usuarios.find(
            (usr) =>
              usr.email.toLowerCase() === userIdentifier.toLowerCase() ||
              usr.name.toLowerCase() === userIdentifier.toLowerCase()
          );

          if (u) {
            const startDateTime = new Date(`${dataStr}T${horaIni}:00`);
            const endDateTime = new Date(`${dataStr}T${horaFim}:00`);

            await registroService.create({
              data: new Date(dataStr),
              startTime: startDateTime,
              endTime: endDateTime,
              userId: u.id,
            });
            sucessoCount++;
          }
        }
      }

      setSuccessMsg(`${sucessoCount} escalas importadas com sucesso!`);
      setImportModalOpen(false);
      setImportText("");
      carregarDados();
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao processar importação.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">Central de Relatórios & Escalas</h1>
              <p className="text-sm text-zinc-400">
                Exporte cronogramas de plantões em PDF e Excel ou importe escalas em lote.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Importar em Lote</span>
          </button>

          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-500/30 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel (.xlsx)</span>
          </button>

          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF de Impressão</span>
          </button>
        </div>
      </div>

      {/* FEEDBACKS */}
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between text-red-300 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-300 text-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* BARRA DE FILTROS */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-zinc-300 whitespace-nowrap">Mês de Referência:</span>
          <input
            type="month"
            value={mesAno}
            onChange={(e) => setMesAno(e.target.value)}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Users className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-zinc-300 whitespace-nowrap">Filtrar Plantonista:</span>
          <select
            value={filtroUsuario}
            onChange={(e) => setFiltroUsuario(e.target.value)}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Todos os Plantonistas</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div className="sm:ml-auto text-xs text-zinc-500 font-mono">
          {escalasFiltradas.length} escalas no período
        </div>
      </div>

      {/* TABELA DE PRÉVIA */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-400" />
            Prévia do Cronograma
          </h2>
        </div>

        {escalasFiltradas.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            Nenhuma escala encontrada para o mês e filtros selecionados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[11px] text-zinc-400 uppercase bg-zinc-950/60 border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Data do Plantão</th>
                  <th className="py-3 px-4">Dia da Semana</th>
                  <th className="py-3 px-4">Plantonista Escalado</th>
                  <th className="py-3 px-4">Horário de Início</th>
                  <th className="py-3 px-4">Horário de Fim</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {escalasFiltradas.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-zinc-800/30">
                    <td className="py-3 px-4 font-mono text-zinc-500">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold text-zinc-100">
                      {new Date(item.data || item.startTime).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 capitalize">
                      {new Date(item.data || item.startTime).toLocaleDateString("pt-BR", { weekday: "long" })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300 uppercase">
                          {item.user?.name ? item.user.name.substring(0, 2) : "PL"}
                        </div>
                        <span className="font-medium text-zinc-200">{item.user?.name || "Não informado"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-300">
                      {item.startTime ? new Date(item.startTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "08:00"}
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-300">
                      {item.endTime ? new Date(item.endTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "18:00"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        Confirmado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL DE IMPORTAÇÃO EM LOTE */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                Importador de Escalas em Lote
              </h2>
              <button onClick={() => setImportModalOpen(false)} className="p-1 text-zinc-400 hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Cole as linhas de escala no formato: <br />
              <code className="text-cyan-300 font-mono">AAAA-MM-DD; email_ou_nome; 08:00; 18:00</code>
            </p>

            <textarea
              rows={6}
              placeholder={`2026-09-01; lucas@gmail.com; 08:00; 18:00\n2026-09-02; lucas@gmail.com; 08:00; 18:00`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={handleProcessarImportacao}
                disabled={importing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {importing && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <span>Processar Importação</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
