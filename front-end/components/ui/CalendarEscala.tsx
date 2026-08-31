// src/components/ui/CalendarEscala.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { RegistroEscala } from "./EscalaTable";
import { cn } from "@/lib/utils";

interface CalendarEscalaProps {
  registros: RegistroEscala[];
}

export function CalendarEscala({ registros }: CalendarEscalaProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const ano = currentDate.getFullYear();
  const mes = currentDate.getMonth();

  // Nomes dos meses para exibição
  const mesesNome = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Dias da semana simplificados
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Auxiliares para gerar o grid do mês
  const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
  const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

  // Navegação de meses
  const handlePrevMonth = () => {
    setCurrentDate(new Date(ano, mes - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(ano, mes + 1, 1));
  };

  // Verifica quais registros caem em um dia específico do mês atual
  const obterPlantonistasDoDia = (dia: number) => {
    return registros.filter((reg) => {
      if (!reg.data) return false;
      const match = typeof reg.data === "string" ? reg.data.match(/^(\d{4})-(\d{2})-(\d{2})/) : null;
      if (match) {
        const regAno = parseInt(match[1], 10);
        const regMes = parseInt(match[2], 10) - 1;
        const regDia = parseInt(match[3], 10);
        return regAno === ano && regMes === mes && regDia === dia;
      }
      const dataReg = new Date(reg.data);
      return (
        dataReg.getUTCFullYear() === ano &&
        dataReg.getUTCMonth() === mes &&
        dataReg.getUTCDate() === dia
      );
    });
  };

  // Monta a estrutura do grid (espaços vazios do início do mês + dias reais)
  const diasGrid = [];
  for (let i = 0; i < primeiroDiaDoMes; i++) {
    diasGrid.push(null);
  }
  for (let d = 1; d <= totalDiasNoMes; d++) {
    diasGrid.push(d);
  }

  return (
    <div className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-3.5 font-sans antialiased text-left select-none shadow-xs">
      {/* Cabeçalho do Calendário */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon size={15} className="text-zinc-400" />
          <h3 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider">
            {mesesNome[mes]} de {ano}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Cabeçalho dos Dias da Semana */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {diasSemana.map((dia) => (
          <span key={dia} className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            {dia}
          </span>
        ))}
      </div>

      {/* Grid de Dias do Calendário */}
      <div className="grid grid-cols-7 gap-1.5">
        {diasGrid.map((dia, index) => {
          if (dia === null) {
            return <div key={`empty-${index}`} />;
          }

          const plantonistas = obterPlantonistasDoDia(dia);
          const temPlantao = plantonistas.length > 0;

          return (
            <div
              key={`dia-${dia}`}
              className={cn(
                "h-10 rounded-md border flex flex-col justify-between p-1 transition-all relative",
                temPlantao
                  ? "bg-zinc-800/40 border-zinc-700 text-zinc-100"
                  : "bg-zinc-950/40 border-zinc-800/60 text-zinc-500"
              )}
            >
              {/* Número do Dia */}
              <span className={cn(
                "text-[11px] font-medium leading-none",
                temPlantao ? "text-zinc-200 font-semibold" : "text-zinc-400"
              )}>
                {dia}
              </span>

              {/* Indicador de Plantonista no rodapé do bloco do dia */}
              {temPlantao && (
                <div className="flex flex-col gap-0.5 max-w-full">
                  {plantonistas.slice(0, 1).map((p) => (
                    <span 
                      key={p.id} 
                      className="text-[8px] bg-zinc-800 text-zinc-300 border border-zinc-700 px-1 rounded truncate w-full text-center font-medium"
                      title={p.user?.name}
                    >
                      {p.user?.name?.split(" ")[0]}
                    </span>
                  ))}
                  {plantonistas.length > 1 && (
                    <span className="text-[7px] text-zinc-400 text-right pr-0.5">
                      +{plantonistas.length - 1}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}