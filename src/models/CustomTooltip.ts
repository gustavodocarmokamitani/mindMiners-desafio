import type { TaxChartData } from "../utils/calculator";

export type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: TaxChartData; 
  }[];
  label?: string;
};