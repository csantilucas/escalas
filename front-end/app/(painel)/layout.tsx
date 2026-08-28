// src/app/dashboard/layout.tsx
import { Sidebar } from "@/components/common/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-300 antialiased">
      {/* Menu Lateral Fixo */}
      <Sidebar />

      {/* Área Principal de Conteúdo das Telas */}
      <main className="flex-1 h-screen overflow-y-auto p-4">      
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}