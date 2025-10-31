import type { SupporterGraphData } from '../types/SupporterGraphData';

export const mockSupporterGraphDataMap: {
  [sequence: string]: {
    [date: string]: SupporterGraphData;
  };
} = {
  'abc-123': {
    '2025-10-24': {
      sequenceUUID: 'abc-123',
      allowed_support_per_day: 50,
      current_time_index: 1,
      orders: [
        { order_ident_value: '001', order_name: 'Car 001', planned: 5, actual: 6, forecast: 6, drift_limit: 7, time: '08:00', details: 'Red car, high complexity' },
        { order_ident_value: '002', order_name: 'Car 002', planned: 4, actual: 3, forecast: 4, drift_limit: 6, time: '08:10', details: 'Blue car, medium complexity' },
        { order_ident_value: '003', order_name: 'Car 003', planned: 6, actual: 7, forecast: 7, drift_limit: 8, time: '08:20', details: 'Green car, low complexity' },
      ],
    },
    '2025-10-23': {
      sequenceUUID: 'abc-123',
      allowed_support_per_day: 45,
      current_time_index: 1,
      orders: [
        { order_ident_value: '004', order_name: 'Car 004', planned: 3, actual: 2, forecast: 3, drift_limit: 4, time: '08:00', details: 'Yellow car, medium complexity' },
        { order_ident_value: '005', order_name: 'Car 005', planned: 5, actual: 6, forecast: 6, drift_limit: 7, time: '08:10', details: 'Black car, high complexity' },
        { order_ident_value: '006', order_name: 'Car 006', planned: 4, actual: 5, forecast: 5, drift_limit: 6, time: '08:20', details: 'White car, low complexity' },
      ],
    },
  },
  'xyz-789': {
    '2025-10-24': {
      sequenceUUID: 'xyz-789',
      allowed_support_per_day: 40,
      current_time_index: 1,
      orders: [
        { order_ident_value: 'A01', order_name: 'Car A01', planned: 2, actual: 3, forecast: 3, drift_limit: 4, time: '08:00', details: 'Orange car, low complexity' },
        { order_ident_value: 'A02', order_name: 'Car A02', planned: 5, actual: 4, forecast: 5, drift_limit: 6, time: '08:10', details: 'Purple car, high complexity' },
        { order_ident_value: 'A03', order_name: 'Car A03', planned: 4, actual: 5, forecast: 5, drift_limit: 6, time: '08:20', details: 'White car, medium complexity' },
      ],
    },
    '2025-10-23': {
      sequenceUUID: 'xyz-789',
      allowed_support_per_day: 35,
      current_time_index: 0,
      orders: [
        { order_ident_value: 'B01', order_name: 'Car B01', planned: 3, actual: 2, forecast: 3, drift_limit: 4, time: '08:00', details: 'Silver car, medium complexity' },
        { order_ident_value: 'B02', order_name: 'Car B02', planned: 4, actual: 5, forecast: 5, drift_limit: 6, time: '08:10', details: 'Gold car, high complexity' },
        { order_ident_value: 'B03', order_name: 'Car B03', planned: 2, actual: 3, forecast: 3, drift_limit: 4, time: '08:20', details: 'Bronze car, low complexity' },
      ],
    },
  },
};
