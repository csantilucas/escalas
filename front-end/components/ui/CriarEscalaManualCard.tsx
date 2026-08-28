// src/components/ui/CriarEscalaManualCard.tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface UserOption {
  id: string;
  name: string;
}

interface CriarManualCardProps {
  usuarios: UserOption[];
  isSubmitting: boolean;
  onSubmit: (payload: { plantao_id: string; user_id: string; data: string; startTime: string; endTime: string }) => Promise<void>;
}

export function CriarEscalaManualCard({ usuarios, isSubmitting, onSubmit }: CriarManualCardProps) {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("18:00");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId || !data) return setError("Preencha todos os campos obrigatórios.");
    setError("");
    try {
      const startTimeISO = new Date(`${data}T${horaInicio}:00.000Z`).toISOString();
      const endTimeISO = new Date(`${data}T${horaFim}:00.000Z`).toISOString();

      await onSubmit({
        plantao_id: userId,
        user_id: userId,
        data: new Date(data).toISOString(),
        startTime: startTimeISO,
        endTime: endTimeISO
      });

      setUserId("");
      setData("");
    } catch (err: any) {
      setError(err.message || "Erro ao gravar escala.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans antialiased select-none text-left">
      <div>
        {/* 🟢 FONTE ATUALIZADA: Sem uppercase rígido e tamanho text-sm */}
        <h2 className="text-sm font-semibold text-zinc-300">Criar Escala Manual</h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">Insere um registro isolado diretamente na folha sem alterar o loop automático</p>
      </div>

      {error && (
        <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      {/* Grid de Inputs Ajustada para ser flexível e harmonizada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col gap-1 text-left w-full">
          {/* 🟢 LABEL E SELECT ATUALIZADOS: Sem uppercase, fontes normais e altura h-[36px] */}
          <label className="text-[11px] font-medium text-zinc-500">Plantonista Alvo</label>
          <select 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 outline-none h-[36px] font-medium focus:border-zinc-700 transition-all"
          >
            <option value="" className="bg-zinc-950 text-zinc-500">Selecione...</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id} className="bg-zinc-950 text-zinc-200">
                {u.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Inputs personalizados do projeto com fontes arredondadas e tamanhos proporcionais */}
        <Input label="Data Escala" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <Input label="Início" type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        <Input label="Término" type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
        
        {/* Botão de gravação */}
        <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
          <Button type="submit" isLoading={isSubmitting} className="px-6 h-[36px] text-xs font-semibold">
            Gravar Escala
          </Button>
        </div>
      </div>
    </form>
  );
}