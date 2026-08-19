export type ProjectType =
  | "landing"
  | "business"
  | "ecommerce"
  | "webapp"
  | "saas"
  | "custom";

export type PageRange = "1-3" | "4-7" | "8-15" | "15+";

export type DesignLevel = "existing" | "uiux_needed" | "premium_custom";

export type FeatureKey =
  | "auth"
  | "admin"
  | "payment"
  | "telegram_bot"
  | "api_integration"
  | "database"
  | "multilingual"
  | "animation"
  | "dashboard"
  | "seo_performance";

export type DeadlineSpeed = "fast_1_2w" | "standard_2_4w" | "deep_1_2m" | "flexible";

export interface CalculatorState {
  projectType: ProjectType;
  pageRange: PageRange;
  designLevel: DesignLevel;
  features: FeatureKey[];
  deadline: DeadlineSpeed;
}

export interface EstimatedPriceResult {
  // USD
  minPriceUSD: number;
  maxPriceUSD: number;
  basePriceUSD: number;
  featuresTotalUSD: number;
  designPriceUSD: number;
  
  // UZS (Calculated with centralized rate)
  minPriceUZS: number;
  maxPriceUZS: number;
  basePriceUZS: number;
  featuresTotalUZS: number;
  designPriceUZS: number;

  // Metadata
  exchangeRate: number;
  minWeeks: number;
  maxWeeks: number;
  summaryTitle: string;
  summaryFeatures: string[];
  summaryDurationText: string;

  // Backward compatibility helpers
  minPrice: number; // = minPriceUSD
  maxPrice: number; // = maxPriceUSD
}
