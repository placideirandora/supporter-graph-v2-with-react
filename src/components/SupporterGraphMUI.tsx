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

import { ChartsLegend } from '@mui/x-charts';

const SupporterGraphMUI = ({ rawData }: { rawData: SupporterGraphData }) => {
  const { data, summary } = transformSupporterData(rawData);

  const chartData = data.map((d) => ({
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
        margin={{ bottom: 86 }}
        dataset={chartData}
        series={[
          {
            type: 'line',
            dataKey: 'cumulativePlanned',
            label: 'Planned',
            color: '#1976d2',
          },
          {
            type: 'line',
            dataKey: 'cumulativeActual',
            label: 'Actual',
            color: '#2e7d32',
          },
          {
            type: 'line',
            dataKey: 'cumulativeForecast',
            label: 'Forecast',
            color: '#fbc02d',
          },
          {
            type: 'line',
            dataKey: 'cumulativeDriftLimit',
            label: 'Drift Limit',
            color: '#ef6c00',
          },
        ]}
        xAxis={[{ scaleType: 'point', dataKey: 'xLabel' }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis />
        <ChartsYAxis />
        <ChartsLegend
          position={{
            horizontal: 'middle',
            vertical: 'bottom',
          }}
          direction="row"
        />
        {rawData.current_time_index != null &&
          rawData.orders[rawData.current_time_index] && (
            <ChartsReferenceLine
              x={`${rawData.orders[rawData.current_time_index].order_name}`}
              lineStyle={{ stroke: 'gray', strokeDasharray: '4 2' }}
              label="Now"
              labelStyle={{ fill: 'gray', fontSize: 12 }}
            />
          )}

         {/* Horizontal reference lines */}
        <ChartsReferenceLine
          y={rawData.allowed_support_per_day}
          lineStyle={{ stroke: 'orange', strokeDasharray: '4 2' }}
          label="Limit"
          labelStyle={{ fill: 'orange', fontSize: 12 }}
        />
        
        <ChartsReferenceLine
          y={summary.totalPlanned}
          lineStyle={{ stroke: '#1976d2', strokeDasharray: '4 2' }}
          label="Planned Total"
          labelStyle={{ fill: '#1976d2', fontSize: 12 }}
        />

        <CustomItemTooltip orders={rawData.orders} chartData={chartData} />
      </ResponsiveChartContainer>
    </div>
  );
};

export default SupporterGraphMUI;

// PENDING TODO: FIND A WAY TO DISPLAY THE POPUP DETAILS UPON RANGE HOVER. CURRENT
// THE USER IS FORCED TO OVER OVER THE SPECIFIC POINT

// PENDING TODO: FIND A WAY TO REMOVE THE DOTS
