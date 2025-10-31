import * as React from 'react';
import NoSsr from '@mui/material/NoSsr';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useItemTooltip, useMouseTracker } from '@mui/x-charts/ChartsTooltip';
import { generateVirtualElement } from '../utils/generateVirtualElement';
import type { SupporterGraphData } from '../types/SupporterGraphData';

type ChartDatum = {
  xLabel: string;
  cumulativePlanned: number;
  cumulativeActual: number;
  cumulativeForecast: number;
  cumulativeDriftLimit: number;
};

export function CustomItemTooltip({
  orders,
  chartData,
}: {
  orders: SupporterGraphData['orders'];
  chartData: ChartDatum[];
}) {
  const tooltipData = useItemTooltip();
  const mousePosition = useMouseTracker();

  if (!tooltipData || !mousePosition) return null;

  const isMousePointer = mousePosition.pointerType === 'mouse';
  const yOffset = isMousePointer ? 0 : 40 - mousePosition.height;

  const dataIndex = tooltipData.identifier?.dataIndex;
  const hoveredOrder = dataIndex != null ? orders[dataIndex] : undefined;
  const hoveredData = dataIndex != null ? chartData[dataIndex] : undefined;

  return (
    <NoSsr>
      <Popper
        sx={{ pointerEvents: 'none', zIndex: (theme) => theme.zIndex.modal }}
        open
        placement={isMousePointer ? 'top-end' : 'top'}
        anchorEl={generateVirtualElement(mousePosition)}
        modifiers={[{ name: 'offset', options: { offset: [0, yOffset] } }]}
      >
        <Paper
          elevation={0}
          sx={{
            m: 1,
            p: 1.5,
            border: 'solid',
            borderWidth: 2,
            borderColor: 'divider',
            minWidth: 220,
          }}
        >
          <Stack spacing={1}>
            {/* ✅ Show hovered series value */}
            {/* <Stack direction="row" alignItems="center">
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  backgroundColor: tooltipData.color,
                }}
              />
              <Typography sx={{ ml: 2 }}>{tooltipData.label}</Typography>
              <Typography sx={{ ml: 2 }}>{tooltipData.formattedValue}</Typography>
            </Stack> */}

            {/* ✅ Show all cumulative values */}
            {hoveredData && (
              <Stack spacing={0.5} sx={{ pl: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Planned: {hoveredData.cumulativePlanned}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Actual: {hoveredData.cumulativeActual}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Forecast: {hoveredData.cumulativeForecast}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drift Limit: {hoveredData.cumulativeDriftLimit}
                </Typography>
              </Stack>
            )}

            {/* ✅ Show order metadata */}
            {hoveredOrder && (
              <Stack spacing={0.5} sx={{ pl: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Order No: {hoveredOrder.order_ident_value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {hoveredOrder.planned}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Country: {hoveredOrder.details}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Popper>
    </NoSsr>
  );
}
