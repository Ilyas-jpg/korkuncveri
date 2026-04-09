import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sayıyı Türkçe formatla: 1234567 → "1.234.567"
 */
export function formatNumber(n: number | null | undefined): string {
  if (n == null) return "—";
  return n.toLocaleString("tr-TR");
}

/**
 * Yüzde formatla: 0.6842 → "%68,4"
 */
export function formatPercent(n: number | null | undefined, decimals = 1): string {
  if (n == null) return "—";
  return `%${(n * 100).toFixed(decimals).replace(".", ",")}`;
}

/**
 * Büyük sayıları kısalt: 1234567 → "1,2M"
 */
export function formatCompact(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(".", ",")}B`;
  return n.toString();
}

/**
 * Slug oluştur: "Kadıköy İlçesi" → "kadikoy-ilcesi"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Sentiment skorunu renge çevir: -1 → kırmızı, 0 → sarı, 1 → yeşil
 */
export function sentimentColor(score: number): string {
  if (score >= 0.3) return "var(--color-accent-success)";
  if (score <= -0.3) return "var(--color-accent-danger)";
  return "var(--color-accent-warn)";
}
