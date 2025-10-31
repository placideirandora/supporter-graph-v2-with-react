import * as React from 'react';
import {
  ResponsiveChartContainer,
  LinePlot,
  MarkPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsReferenceLine,
} from '@mui/x-charts';
import { transformSupporterData } from '../utils/transformSupporterData';
import type { SupporterGraphData } from '../types/SupporterGraphData';
import { CustomItemTooltip } from './SupporterCustomItemTooltip';

const SupporterGraphMUI = ({ rawData }: { rawData: SupporterGraphData }) => {
  const { data } = transformSupporterData(rawData);

  const chartData = data.map(d => ({
    xLabel: d.xLabel,
    cumulativePlanned: d.cumulativePlanned,
    cumulativeActual: d.cumulativeActual,
    cumulativeForecast: d.cumulativeForecast,
    cumulativeDriftLimit: d.cumulativeDriftLimit,
  }));

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveChartContainer
        height={400}
        dataset={chartData}
        series={[
          { type: 'line', dataKey: 'cumulativePlanned', label: 'Planned', color: '#1976d2', markStyle: { fill: 'transparent', stroke: 'transparent' }, },
          { type: 'line', dataKey: 'cumulativeActual', label: 'Actual', color: '#2e7d32' },
          { type: 'line', dataKey: 'cumulativeForecast', label: 'Forecast', color: '#fbc02d' },
          { type: 'line', dataKey: 'cumulativeDriftLimit', label: 'Drift Limit', color: '#ef6c00' },
        ]}
        xAxis={[{ scaleType: 'point', dataKey: 'xLabel' }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis />
        <ChartsYAxis />
        {rawData.current_time_index != null && rawData.orders[rawData.current_time_index] && (
          <ChartsReferenceLine
            x={`${rawData.orders[rawData.current_time_index].order_name} (${rawData.orders[rawData.current_time_index].time})`}
            lineStyle={{ stroke: 'gray', strokeDasharray: '4 2' }}
            label="Now"
            labelStyle={{ fill: 'gray', fontSize: 12 }}
          />
        )}

        <CustomItemTooltip
          orders={rawData.orders}
          chartData={chartData}
        />
      </ResponsiveChartContainer>
    </div>
  );
};

export default SupporterGraphMUI;
