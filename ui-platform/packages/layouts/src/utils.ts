import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with clsx and tailwind-merge
 * Properly handles Tailwind class conflicts (e.g., px-4 + px-8 = px-8)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
