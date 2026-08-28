// src/components/ui/VincularPlantonistaCard.tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface UserOption {
  id: string;
  name: string;
}

interface VincularCardProps {
  usuarios: UserOption[];
  isSubmitting: boolean;
  onSubmit: (userId: string) => Promise<void>;
}

export function VincularPlantonistaCard({ usuarios, isSubmitting, onSubmit }: VincularCardProps) {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId) return setError("Selecione um usuário para vincular.");
    setError("");
    try {
      await onSubmit(userId);
      setUserId("");
    } catch (err: any) {
      setError(err.message || "Erro ao vincular.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans antialiased select-none text-left">
      <div>
        <h2 className="text-sm font-semibold text-zinc-300">Vincular Analista à Fila</h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">Adiciona o usuário no fim da esteira sequencial em loop</p>
      </div>

      {error && (
        <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
        <div className="flex flex-col gap-1 flex-1 w-full text-left">
          <label className="text-[11px] font-medium text-zinc-500">Selecionar Usuário</label>
          <select 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3 text-sm text-zinc-200 outline-none h-[36px] font-medium focus:border-zinc-700 transition-all"
          >
            <option value="" className="bg-zinc-950 text-zinc-500">Selecione...</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id} className="bg-zinc-950 text-zinc-200">
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🟢 BOTÃO ATUALIZADO: Altura de h-[36px] para se alinhar perfeitamente com o select */}
        <Button 
          type="submit" 
          isLoading={isSubmitting} 
          className="shrink-0 w-full sm:w-auto px-6 h-[36px] text-xs font-semibold"
        >
          Vincular
        </Button>
      </div>
    </form>
  );
}