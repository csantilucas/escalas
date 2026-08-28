// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Essa função junta as classes do Tailwind e resolve conflitos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}