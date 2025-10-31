import type { SupporterGraphData, Order } from '../types/SupporterGraphData';

export interface TransformedOrder {
  name: string;
  time: string;
  details: string;
  cumulativePlanned: number;
  cumulativeActual: number;
  cumulativeForecast: number;
  cumulativeDriftLimit: number;
  index: number;
  exceedsPlanned: boolean;
  exceedsLimit: boolean;
  xLabel: string; // ✅ Add this
  // ✅ Add this to satisfy dataset typing
  [key: string]: string | number | boolean;
}

export interface GraphSummary {
  totalPlanned: number;
  totalActual: number;
  totalForecast: number;
  totalDriftLimit: number;
  exceededLimit: boolean;
}

export const transformSupporterData = (
  rawData: SupporterGraphData
): { data: TransformedOrder[]; summary: GraphSummary } => {
  let cumulativePlanned = 0;
  let cumulativeActual = 0;
  let cumulativeForecast = 0;
  let cumulativeDriftLimit = 0;

  const data = rawData.orders.map((order: Order, index: number): TransformedOrder => {
    cumulativePlanned += order.planned;
    cumulativeActual += order.actual;
    cumulativeForecast += order.forecast;
    cumulativeDriftLimit += order.drift_limit;

    return {
      name: order.order_name,
      time: order.time,
      details: order.details,
      cumulativePlanned,
      cumulativeActual,
      cumulativeForecast,
      cumulativeDriftLimit,
      index,
      exceedsPlanned: order.actual > order.planned,
      exceedsLimit: cumulativeActual > rawData.allowed_support_per_day,
      xLabel: `${order.order_name} (${order.time})`,
    };
  });

  const summary: GraphSummary = {
    totalPlanned: cumulativePlanned,
    totalActual: cumulativeActual,
    totalForecast: cumulativeForecast,
    totalDriftLimit: cumulativeDriftLimit,
    exceededLimit: cumulativeActual > rawData.allowed_support_per_day,
  };

  return { data, summary };
};
