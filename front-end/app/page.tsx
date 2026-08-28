// src/app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function RootPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  

  const escolheuDestino = useRef(false);

  useEffect(() => {
    if (loading || escolheuDestino.current) return;

    if (isAuthenticated) {
      escolheuDestino.current = true;
      router.replace("/dashboard");
    } else {
      escolheuDestino.current = true;
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Enquanto verifica os cookies, exibe uma tela neutra de transição
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center select-none">
      <div className="flex flex-col items-center gap-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-800 border-t-zinc-400" />
        <h1 className="text-xs font-bold tracking-wider text-zinc-500 uppercase font-mono animate-pulse">
          Alpha Escalas
        </h1>
      </div>
    </div>
  );
}