// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, isLoading, variant = "primary", ...props }, ref) => {
    
    const variants = {
      // Azul corporativo de alto contraste
      primary: "bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xs focus-visible:ring-blue-500",
      // Tom neutro de superfície
      secondary: "bg-zinc-800 hover:bg-zinc-750 text-zinc-100 border border-zinc-700/80 font-medium focus-visible:ring-zinc-500",
      // Linha sutil
      outline: "border border-zinc-800 hover:bg-zinc-800/60 text-zinc-300 hover:text-white font-medium focus-visible:ring-zinc-700",
      // Ghost
      ghost: "hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 font-medium focus-visible:ring-zinc-700",
      // Exclusão / Perigo
      danger: "bg-red-600 hover:bg-red-500 text-white font-semibold shadow-xs focus-visible:ring-red-500",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all select-none font-sans antialiased", 
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Carregando...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };