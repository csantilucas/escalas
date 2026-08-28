// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full text-left font-sans antialiased">
        {label && (
          <label 
            htmlFor={id} 
            className="text-[11px] font-medium text-zinc-500"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "flex w-full h-[36px] rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-3 text-sm text-zinc-200 placeholder:text-zinc-600 font-medium",
            "transition-all duration-150 outline-none",
            "focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-900 focus:border-red-800 focus:ring-red-950",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };