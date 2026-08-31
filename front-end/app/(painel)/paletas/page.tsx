"use client";

import { useState } from "react";
import { useTheme, PALETTES_CONFIG, DARK_BG_OPTIONS, ColorPaletteId, DarkBgVariant } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Palette,
  Check,
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
  Tv,
  Layers,
  Flame,
  User,
  ShieldCheck,
  AlertCircle,
  Clock,
  LayoutDashboard,
} from "lucide-react";

export default function PaletasPage() {
  const {
    theme,
    palette,
    darkBg,
    setTheme,
    setPalette,
    setDarkBg,
    resetToDefaults,
    currentPaletteConfig,
  } = useTheme();

  const { user } = useAuth();
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Verificação de perfil admin
  const role = String(user?.role || user?.typeUser || "").toLowerCase();
  const isAdmin = role === "admin" || user?.role === "admin" || user?.typeUser === "admin";

  const exibirFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  const selecionarPaleta = (id: ColorPaletteId) => {
    setPalette(id);
    const paleta = PALETTES_CONFIG.find((p) => p.id === id);
    exibirFeedback(`Paleta "${paleta?.name}" ativada e salva com sucesso!`);
  };

  const selecionarFundo = (variant: DarkBgVariant) => {
    setDarkBg(variant);
    const fundo = DARK_BG_OPTIONS.find((d) => d.id === variant);
    exibirFeedback(`Fundo "${fundo?.name}" aplicado em todo o sistema!`);
  };

  const handleReset = () => {
    resetToDefaults();
    exibirFeedback("Configurações visuais restauradas para o padrão!");
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
          <AlertCircle size={36} />
        </div>
        <h2 className="text-xl font-bold text-zinc-100">Acesso Restrito ao Administrador</h2>
        <p className="text-sm text-zinc-400 max-w-md">
          Apenas administradores do sistema possuem permissão para alterar a paleta de cores global.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto font-sans">
      {/* 🟢 CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border transition-all"
              style={{
                backgroundColor: currentPaletteConfig.subtleBg,
                borderColor: currentPaletteConfig.subtleBorder,
                color: currentPaletteConfig.accentText,
              }}
            >
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-100">
                Paleta de Cores & Customização Visual
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Altere o tema visual, cores de acento e contraste de fundo de toda a plataforma Alpha Escalas.
              </p>
            </div>
          </div>
        </div>

        {/* BOTÃO RESTAURAR */}
        <div className="flex items-center gap-3">
          {feedbackMessage && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-fade-in flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              {feedbackMessage}
            </span>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-white transition-all cursor-pointer shadow-xs"
            title="Restaurar padrão"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Restaurar Padrões</span>
          </button>
        </div>
      </div>

      {/* 🟢 SEÇÃO 1: SELEÇÃO DE PALETAS DE ACENTO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: currentPaletteConfig.accentText }} />
            <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
              Paletas de Cores Principais
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            {PALETTES_CONFIG.length} paletas disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PALETTES_CONFIG.map((p) => {
            const isSelected = palette === p.id;

            return (
              <div
                key={p.id}
                onClick={() => selecionarPaleta(p.id)}
                className={`relative group bg-zinc-900/60 border rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] shadow-sm ${
                  isSelected
                    ? "border-2 shadow-lg"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
                style={{
                  borderColor: isSelected ? p.primary : undefined,
                  boxShadow: isSelected ? `0 4px 20px -2px ${p.subtleBg}` : undefined,
                }}
              >
                {/* Indicador de Seleção Ativa */}
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm text-white"
                    style={{ backgroundColor: p.primary }}
                  >
                    <Check className="w-3 h-3" />
                    Ativo
                  </div>
                )}

                {/* Bloco de Cores em Gradiente / Swatches */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 h-7 rounded-xl overflow-hidden p-1 bg-zinc-950/60 border border-zinc-800/80">
                    {p.previewColors.map((cor, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 rounded-lg transition-transform group-hover:scale-105"
                        style={{ backgroundColor: cor }}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Rodapé do Card da Paleta */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: p.primary }}
                    />
                    <span className="font-mono font-bold text-zinc-300 text-[11px]">
                      {p.primary}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: p.accentText }}
                  >
                    {isSelected ? "Em uso" : "Selecionar"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🟢 SEÇÃO 2: CONTRASTE DE FUNDO (DARK/LIGHT & VARIANTES) */}
      <section className="space-y-4 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
            Modo de Exibição & Variantes de Fundo
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Alternador Principal Dark / Light */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <span>Modo do Sistema</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-600 text-white shadow-md"
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <Moon className="w-4 h-4 text-blue-400" />
                <span>Modo Escuro (Dark)</span>
                {theme === "dark" && <Check className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
              </button>

              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-white border-zinc-300 text-zinc-900 shadow-md"
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Modo Claro (Light)</span>
                {theme === "light" && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
              </button>
            </div>
          </div>

          {/* Variantes de Fundo do Modo Escuro */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100">
              Variante de Fundo Escuro
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              {DARK_BG_OPTIONS.map((opt) => {
                const isSelected = darkBg === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => selecionarFundo(opt.id)}
                    disabled={theme === "light"}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      theme === "light"
                        ? "opacity-50 cursor-not-allowed border-zinc-800 bg-zinc-900/20"
                        : isSelected
                        ? "bg-zinc-950 border-zinc-600 shadow-sm text-white"
                        : "bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-4 h-4 rounded-md border border-zinc-700 shrink-0 shadow-xs"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <div className="truncate">
                        <p className="font-bold truncate">{opt.name.split("(")[0]}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{opt.hex}</p>
                      </div>
                    </div>
                    {isSelected && theme === "dark" && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 SEÇÃO 3: SIMULADOR INTERATIVO / PREVIEW EM TEMPO REAL */}
      <section className="space-y-4 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
              Simulador em Tempo Real da Paleta Selecionada
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-medium">
            Visualização ao vivo dos componentes do sistema
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Componente Exemplo 1: Card de Plantonista Ativo */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  borderColor: currentPaletteConfig.subtleBorder,
                  color: currentPaletteConfig.accentText,
                }}
              >
                <Flame className="w-3.5 h-3.5" />
                Plantonista da Vez
              </span>
              <span className="text-xs font-mono text-zinc-500 font-semibold">Preview</span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shrink-0 border"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  borderColor: currentPaletteConfig.subtleBorder,
                  color: currentPaletteConfig.accentText,
                }}
              >
                AL
              </div>
              <div className="min-w-0">
                <p className="font-black text-base text-zinc-100 truncate">Analista Exemplo</p>
                <p className="text-xs text-zinc-400 truncate">analista@alphasoftware.com.br</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Status da Escala</span>
              <span className="font-bold text-zinc-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sincronizado
              </span>
            </div>
          </div>

          {/* Componente Exemplo 2: Botões e Badges Interativas */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm">
            <div>
              <h3 className="font-bold text-sm text-zinc-200">Botões & Ações Principais</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Estilos de botões da interface</p>
            </div>

            <div className="space-y-2.5">
              <button
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: currentPaletteConfig.primary }}
              >
                <span>Ação Primária ({currentPaletteConfig.name.split(" ")[0]})</span>
              </button>

              <button
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-center gap-2"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  borderColor: currentPaletteConfig.subtleBorder,
                  color: currentPaletteConfig.accentText,
                }}
              >
                <span>Ação Sutil / Destaque Secundário</span>
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
                style={{
                  backgroundColor: currentPaletteConfig.subtleBg,
                  color: currentPaletteConfig.accentText,
                }}
              >
                #TAG-LIVE
              </span>
              <span className="text-xs text-zinc-400">Badges de dados dinâmicos</span>
            </div>
          </div>

          {/* Componente Exemplo 3: Card Wallboard TV Mini */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4" style={{ color: currentPaletteConfig.accentText }} />
                <h3 className="font-bold text-sm text-zinc-200">Wallboard TV Mode</h3>
              </div>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentPaletteConfig.primary }} />
            </div>

            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Progresso do Slide</span>
                <span className="font-mono font-bold" style={{ color: currentPaletteConfig.accentText }}>
                  65%
                </span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: "65%",
                    backgroundColor: currentPaletteConfig.primary,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Tema Geral:</span>
              <span className="font-bold text-zinc-200 capitalize">
                {theme} • {currentPaletteConfig.name}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
