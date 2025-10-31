import * as React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts';
import { ChartsXAxis } from '@mui/x-charts';
import { ChartsYAxis } from '@mui/x-charts';
import { CustomItemTooltip } from '../components/CustomItemTooltip';
import { dataset, valueFormatter } from '../utils/weather';

export default function CustomTooltipContent() {
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveChartContainer
        height={300}
        dataset={dataset}
        series={[
          { type: 'line', dataKey: 'seoul', label: 'Seoul', valueFormatter },
          { type: 'line', dataKey: 'paris', label: 'Paris', valueFormatter },
        ]}
        xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis />
        <ChartsYAxis />
        <CustomItemTooltip />
      </ResponsiveChartContainer>
    </div>
  );
}
