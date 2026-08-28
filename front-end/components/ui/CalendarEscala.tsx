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

  // Verifica quais registros caem em um dia específico do mês atual (usando fuso UTC para alinhar com o seu banco)
  const obterPlantonistasDoDia = (dia: number) => {
    return registros.filter((reg) => {
      if (!reg.data) return false;
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
    <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 font-sans antialiased text-left select-none">
      
      {/* Cabeçalho do Calendário */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-100">
            {mesesNome[mes]} de {ano}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cabeçalho dos Dias da Semana */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {diasSemana.map((dia) => (
          <span key={dia} className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
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
                "h-10 rounded-lg border flex flex-col justify-between p-1 transition-all relative",
                temPlantao
                  ? "bg-zinc-800/40 border-zinc-700/80 text-zinc-100"
                  : "bg-zinc-950/20 border-zinc-800/50 text-zinc-500"
              )}
            >
              {/* Número do Dia */}
              <span className={cn(
                "text-xs font-semibold",
                temPlantao ? "text-zinc-200" : "text-zinc-200"
              )}>
                {dia}
              </span>

              {/* Indicador de Plantonista no rodapé do bloco do dia */}
              {temPlantao && (
                <div className="flex flex-col gap-0.5 max-w-full">
                  {plantonistas.slice(0, 1).map((p) => (
                    <span 
                      key={p.id} 
                      className="text-[8px] bg-zinc-700 text-zinc-200 px-1 rounded truncate w-full text-center font-medium"
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