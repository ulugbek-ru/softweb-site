/**
 * SoftWeb Centralized Currency & Exchange Rate Configuration
 */

// Configurable exchange rate: default is 12,800 UZS per 1 USD
export const DEFAULT_USD_TO_UZS = 12800;

export function getExchangeRate(): number {
  if (typeof process !== "undefined" && process.env.USD_TO_UZS) {
    const parsed = parseInt(process.env.USD_TO_UZS, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_USD_TO_UZS) {
    const parsed = parseInt(process.env.NEXT_PUBLIC_USD_TO_UZS, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return DEFAULT_USD_TO_UZS;
}

/**
 * Format Uzbek so'm (UZS) with proper thousand space separators
 * Example: 15 000 000 UZS or 15 000 000 so'm
 */
export function formatUZS(amount: number, suffix: "UZS" | "so'm" = "so'm"): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} ${suffix}`;
}

/**
 * Format US Dollar (USD)
 * Example: $1,200 or ≈ $1,200 USD
 */
export function formatUSD(amount: number, prefixApprox: boolean = false): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rounded);

  return prefixApprox ? `≈ ${formatted} USD` : formatted;
}

export function convertUSDToUZS(usdAmount: number, rate = getExchangeRate()): number {
  return Math.round((usdAmount * rate) / 10000) * 10000;
}

export function convertUZSToUSD(uzsAmount: number, rate = getExchangeRate()): number {
  return Math.round(uzsAmount / rate);
}
