import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// used to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
