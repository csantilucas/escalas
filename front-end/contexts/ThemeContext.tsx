"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export type ColorPaletteId =
  | "emerald"
  | "blue"
  | "violet"
  | "cyan"
  | "amber"
  | "rose"
  | "indigo"
  | "slate";

export type DarkBgVariant = "zinc" | "oled" | "midnight" | "slate";

export interface ColorPaletteConfig {
  id: ColorPaletteId;
  name: string;
  description: string;
  primary: string;
  primaryHover: string;
  accentText: string;
  subtleBg: string;
  subtleBorder: string;
  previewColors: string[];
}

export const PALETTES_CONFIG: ColorPaletteConfig[] = [
  {
    id: "emerald",
    name: "Esmeralda Alpha",
    description: "Verde esmeralda vibrante e corporativo, clássico do ecossistema Alpha.",
    primary: "#10b981",
    primaryHover: "#059669",
    accentText: "#34d399",
    subtleBg: "rgba(16, 185, 129, 0.12)",
    subtleBorder: "rgba(16, 185, 129, 0.3)",
    previewColors: ["#10b981", "#059669", "#047857", "#34d399"],
  },
  {
    id: "blue",
    name: "Azul Safira",
    description: "Azul profissional de alto contraste, moderno e elegante para painéis.",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    accentText: "#60a5fa",
    subtleBg: "rgba(59, 130, 246, 0.12)",
    subtleBorder: "rgba(59, 130, 246, 0.3)",
    previewColors: ["#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa"],
  },
  {
    id: "violet",
    name: "Violeta Ametista",
    description: "Tons de roxo e violeta ultra modernos com estética futurista e clean.",
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
    accentText: "#a78bfa",
    subtleBg: "rgba(139, 92, 246, 0.12)",
    subtleBorder: "rgba(139, 92, 246, 0.3)",
    previewColors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#a78bfa"],
  },
  {
    id: "cyan",
    name: "Ciano Neon",
    description: "Azul-piscina e ciano elétrico com forte impacto visual e nitidez.",
    primary: "#06b6d4",
    primaryHover: "#0891b2",
    accentText: "#22d3ee",
    subtleBg: "rgba(6, 182, 212, 0.12)",
    subtleBorder: "rgba(6, 182, 212, 0.3)",
    previewColors: ["#06b6d4", "#0891b2", "#0e7490", "#22d3ee"],
  },
  {
    id: "amber",
    name: "Âmbar Sunset",
    description: "Laranja e dourado energéticos, inspirados no pôr do sol e calor visual.",
    primary: "#f59e0b",
    primaryHover: "#d97706",
    accentText: "#fbbf24",
    subtleBg: "rgba(245, 158, 11, 0.12)",
    subtleBorder: "rgba(245, 158, 11, 0.3)",
    previewColors: ["#f59e0b", "#d97706", "#b45309", "#fbbf24"],
  },
  {
    id: "rose",
    name: "Rubi Carmesim",
    description: "Vermelho e rosa intenso para quem busca máxima presença e destaque.",
    primary: "#f43f5e",
    primaryHover: "#e11d48",
    accentText: "#fb7185",
    subtleBg: "rgba(244, 63, 94, 0.12)",
    subtleBorder: "rgba(244, 63, 94, 0.3)",
    previewColors: ["#f43f5e", "#e11d48", "#be123c", "#fb7185"],
  },
  {
    id: "indigo",
    name: "Índigo Profundo",
    description: "Equilíbrio entre azul escuro e roxo, clássico de sistemas de engenharia.",
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    accentText: "#818cf8",
    subtleBg: "rgba(99, 102, 241, 0.12)",
    subtleBorder: "rgba(99, 102, 241, 0.3)",
    previewColors: ["#6366f1", "#4f46e5", "#4338ca", "#818cf8"],
  },
  {
    id: "slate",
    name: "Titânio Monocromático",
    description: "Estética minimalista em escala de cinza e platina neutra e elegante.",
    primary: "#71717a",
    primaryHover: "#52525b",
    accentText: "#d4d4d8",
    subtleBg: "rgba(113, 113, 122, 0.15)",
    subtleBorder: "rgba(113, 113, 122, 0.35)",
    previewColors: ["#71717a", "#52525b", "#3f3f46", "#e4e4e7"],
  },
];

export const DARK_BG_OPTIONS: { id: DarkBgVariant; name: string; description: string; hex: string }[] = [
  { id: "zinc", name: "Carvão Zinc (Padrão)", description: "Tom grafite equilibrado e elegante (#09090b)", hex: "#09090b" },
  { id: "oled", name: "Preto Absoluto (OLED)", description: "Contraste máximo e economia de energia (#000000)", hex: "#000000" },
  { id: "midnight", name: "Azul Meia-Noite", description: "Fundo marinho profundo e sofisticado (#0a0f1d)", hex: "#0a0f1d" },
  { id: "slate", name: "Grafite Slate", description: "Cinza azulado moderno e suave aos olhos (#0f172a)", hex: "#0f172a" },
];

interface ThemeContextType {
  theme: Theme;
  palette: ColorPaletteId;
  darkBg: DarkBgVariant;
  setTheme: (theme: Theme) => void;
  setPalette: (palette: ColorPaletteId) => void;
  setDarkBg: (variant: DarkBgVariant) => void;
  toggleTheme: () => void;
  resetToDefaults: () => void;
  currentPaletteConfig: ColorPaletteConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [palette, setPaletteState] = useState<ColorPaletteId>("blue");
  const [darkBg, setDarkBgState] = useState<DarkBgVariant>("zinc");
  const [mounted, setMounted] = useState(false);

  // Aplica as variáveis CSS e classes ao elemento raiz
  const aplicarConfiguracoesVisuais = (
    novoTema: Theme,
    novaPaleta: ColorPaletteId,
    novoFundo: DarkBgVariant
  ) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    // 1. Alternância Dark / Light
    if (novoTema === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // 2. Paleta e Variantes
    root.setAttribute("data-palette", novaPaleta);
    root.setAttribute("data-dark-bg", novoFundo);

    const config = PALETTES_CONFIG.find((p) => p.id === novaPaleta) || PALETTES_CONFIG.find((p) => p.id === "blue") || PALETTES_CONFIG[0];
    root.style.setProperty("--brand-primary", config.primary);
    root.style.setProperty("--brand-primary-hover", config.primaryHover);
    root.style.setProperty("--brand-accent", config.accentText);
    root.style.setProperty("--brand-subtle-bg", config.subtleBg);
    root.style.setProperty("--brand-subtle-border", config.subtleBorder);
  };

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("alpha_theme") as Theme | null;
      const savedPalette = localStorage.getItem("alpha_palette") as ColorPaletteId | null;
      const savedDarkBg = localStorage.getItem("alpha_dark_bg") as DarkBgVariant | null;

      const initialTheme: Theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      const initialPalette: ColorPaletteId =
        savedPalette && PALETTES_CONFIG.some((p) => p.id === savedPalette)
          ? savedPalette
          : "blue";

      const initialDarkBg: DarkBgVariant =
        savedDarkBg && DARK_BG_OPTIONS.some((d) => d.id === savedDarkBg)
          ? savedDarkBg
          : "zinc";

      setThemeState(initialTheme);
      setPaletteState(initialPalette);
      setDarkBgState(initialDarkBg);
      aplicarConfiguracoesVisuais(initialTheme, initialPalette, initialDarkBg);
    } catch {
      aplicarConfiguracoesVisuais("dark", "blue", "zinc");
    } finally {
      setMounted(true);
    }
  }, []);

  const setTheme = (novoTema: Theme) => {
    setThemeState(novoTema);
    aplicarConfiguracoesVisuais(novoTema, palette, darkBg);
    try {
      localStorage.setItem("alpha_theme", novoTema);
    } catch {}
  };

  const setPalette = (novaPaleta: ColorPaletteId) => {
    setPaletteState(novaPaleta);
    aplicarConfiguracoesVisuais(theme, novaPaleta, darkBg);
    try {
      localStorage.setItem("alpha_palette", novaPaleta);
    } catch {}
  };

  const setDarkBg = (novoFundo: DarkBgVariant) => {
    setDarkBgState(novoFundo);
    aplicarConfiguracoesVisuais(theme, palette, novoFundo);
    try {
      localStorage.setItem("alpha_dark_bg", novoFundo);
    } catch {}
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const resetToDefaults = () => {
    setThemeState("dark");
    setPaletteState("blue");
    setDarkBgState("zinc");
    aplicarConfiguracoesVisuais("dark", "blue", "zinc");
    try {
      localStorage.removeItem("alpha_theme");
      localStorage.removeItem("alpha_palette");
      localStorage.removeItem("alpha_dark_bg");
    } catch {}
  };

  const currentPaletteConfig =
    PALETTES_CONFIG.find((p) => p.id === palette) || PALETTES_CONFIG[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        palette,
        darkBg,
        setTheme,
        setPalette,
        setDarkBg,
        toggleTheme,
        resetToDefaults,
        currentPaletteConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser utilizado dentro de um ThemeProvider");
  }
  return context;
}
