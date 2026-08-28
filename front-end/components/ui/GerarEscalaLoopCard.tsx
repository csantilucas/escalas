// src/components/ui/GerarEscalaLoopCard.tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface GerarCardProps {
  isSubmitting: boolean;
  onSubmit: (payload: { dataInicio: string; diaSemana: number; horarioInicio: string; horarioFim: string }) => Promise<void>;
}

export function GerarEscalaLoopCard({ isSubmitting, onSubmit }: GerarCardProps) {
  const [dataInicio, setDataInicio] = useState("");
  const [diaSemana, setDiaSemana] = useState("6");
  const [horarioInicio, setHorarioInicio] = useState("07:00");
  const [horarioFim, setHorarioFim] = useState("12:00");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!dataInicio) return setError("Selecione a data de início.");
    setError("");
    try {
      await onSubmit({
        dataInicio: new Date(dataInicio).toISOString(),
        diaSemana: Number(diaSemana),
        horarioInicio,
        horarioFim
      });
    } catch (err: any) {
      setError(err.message || "Erro ao gerar ciclo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans antialiased select-none text-left">
      <div>
        <h2 className="text-sm font-semibold text-zinc-300">Geração em Lote Sequencial</h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">Calcula e gera as escalas em loop respeitando as posições da fila</p>
      </div>

      {error && (
        <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      {/* Grid de Inputs Ajustada para ser flexível e harmonizada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <Input label="Data Inicial" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        
        <div className="flex flex-col gap-1 text-left w-full">
          <label className="text-[11px] font-medium text-zinc-500">Dia Alvo</label>
          <select 
            value={diaSemana} 
            onChange={(e) => setDiaSemana(e.target.value)} 
            className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 outline-none h-[36px] font-medium focus:border-zinc-700 transition-all"
          >
            <option value="6" className="bg-zinc-950 text-zinc-200">Sábado</option>
            <option value="0" className="bg-zinc-950 text-zinc-200">Domingo</option>
          </select>
        </div>

        <Input label="Entrada" type="time" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
        <Input label="Saída" type="time" value={horarioFim} onChange={(e) => setHorarioFim(e.target.value)} />
        
        <Button 
          type="submit" 
          isLoading={isSubmitting} 
          className="h-[36px] text-xs font-semibold px-5 w-full"
        >
          Gerar Ciclo
        </Button>
      </div>
    </form>
  );
}