export interface Order {
  order_ident_value: string;
  order_name: string;
  planned: number;
  actual: number;
  forecast: number;
  drift_limit: number;
  time: string;
  details: string;
}

export interface SupporterGraphData {
  sequenceUUID: string;
  allowed_support_per_day: number;
  current_time_index: number;
  orders: Order[];
   current_time_label?: string;
}
