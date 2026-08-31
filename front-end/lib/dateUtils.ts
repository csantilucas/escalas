// lib/dateUtils.ts

/**
 * Utilitários centralizados para tratamento e formatação de datas no front-end
 * Trata diferenças entre UTC (banco de dados) e fuso horário local GMT-4 (Cuiabá/Manaus/Brasil)
 */

/**
 * Extrai os componentes de data (ano, mês, dia) de forma segura sem shift de fuso horário
 */
function parseDateParts(data: string | Date | null | undefined): { ano: number; mes: number; dia: number } | null {
  if (!data) return null;

  if (typeof data === "string") {
    // Se for string no formato YYYY-MM-DD ou ISO com T
    const match = data.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return {
        ano: parseInt(match[1], 10),
        mes: parseInt(match[2], 10) - 1, // 0-indexed
        dia: parseInt(match[3], 10),
      };
    }
  }

  const d = new Date(data);
  if (isNaN(d.getTime())) return null;

  return {
    ano: d.getUTCFullYear(),
    mes: d.getUTCMonth(),
    dia: d.getUTCDate(),
  };
}

/**
 * Formata data no padrão brasileiro DD/MM/AAAA garantindo que o dia não sofra regressão
 * Ex: "2026-08-31T00:00:00.000Z" -> "31/08/2026"
 */
export function formatarData(data: string | Date | null | undefined): string {
  const parts = parseDateParts(data);
  if (!parts) return "—";

  const diaStr = String(parts.dia).padStart(2, "0");
  const mesStr = String(parts.mes + 1).padStart(2, "0");
  return `${diaStr}/${mesStr}/${parts.ano}`;
}

/**
 * Retorna o dia da semana em português (ex: "segunda-feira" ou "seg.")
 */
export function formatarDiaSemana(
  data: string | Date | null | undefined,
  style: "short" | "long" = "short"
): string {
  const parts = parseDateParts(data);
  if (!parts) return "";

  // Cria objeto com a data ao meio-dia UTC para evitar problemas de fuso
  const d = new Date(Date.UTC(parts.ano, parts.mes, parts.dia, 12, 0, 0));
  return d.toLocaleDateString("pt-BR", { weekday: style, timeZone: "UTC" });
}

/**
 * Formata apenas o horário (HH:mm)
 * Se for string "08:00" ou ISO, formata adequadamente
 */
export function formatarHora(data: string | Date | null | undefined): string {
  if (!data) return "08:00";

  if (typeof data === "string") {
    // Se já vier no formato simples "08:00" ou "08:00:00"
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(data)) {
      return data.substring(0, 5);
    }

    // Se vier em ISO com T
    const match = data.match(/T(\d{2}):(\d{2})/);
    if (match) {
      return `${match[1]}:${match[2]}`;
    }
  }

  const d = new Date(data);
  if (isNaN(d.getTime())) return "08:00";

  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

/**
 * Formata data e hora completas para logs, auditoria e timestamps reais (convertendo para fuso local)
 * Ex: "31/08/2026 10:07:25"
 */
export function formatarDataHora(data: string | Date | null | undefined): string {
  if (!data) return "—";
  const d = new Date(data);
  if (isNaN(d.getTime())) return "—";

  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Formata apenas a hora em tempo real para eventos e logs locais
 * Ex: "10:07:25"
 */
export function formatarHoraLocal(data: string | Date | null | undefined): string {
  if (!data) return "—";
  const d = new Date(data);
  if (isNaN(d.getTime())) return "—";

  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Retorna a data de hoje no formato YYYY-MM-DD respeitando o fuso local (-4)
 */
export function obterHojeStr(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
