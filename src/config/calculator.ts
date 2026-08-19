import {
  CalculatorState,
  EstimatedPriceResult,
  FeatureKey,
  PageRange,
  ProjectType,
  DesignLevel,
  DeadlineSpeed,
} from "@/types/calculator";
import {
  PROJECT_TYPES,
  PAGE_RANGES,
  DESIGN_LEVELS,
  FEATURES_LIST,
  DEADLINE_OPTIONS,
  calculateProjectPrice,
  PricingOptionItem,
  FeaturePricingItem,
} from "@/lib/pricing";

export type OptionItem<T> = PricingOptionItem<T>;
export type FeatureOption = FeaturePricingItem;

export const projectTypeOptions = PROJECT_TYPES;
export const pageRangeOptions = PAGE_RANGES;
export const designLevelOptions = DESIGN_LEVELS;
export const featureOptions = FEATURES_LIST;
export const deadlineOptions = DEADLINE_OPTIONS;

export const initialCalculatorState: CalculatorState = {
  projectType: "business",
  pageRange: "4-7",
  designLevel: "uiux_needed",
  features: ["telegram_bot", "animation", "seo_performance"],
  deadline: "standard_2_4w",
};

export const calculateEstimatedPrice = (state: CalculatorState): EstimatedPriceResult => {
  return calculateProjectPrice(state);
};
