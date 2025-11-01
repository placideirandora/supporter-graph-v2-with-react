import * as React from 'react';
import NoSsr from '@mui/material/NoSsr';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useItemTooltip, useMouseTracker } from '@mui/x-charts/ChartsTooltip';
import { generateVirtualElement } from '../utils/generateVirtualElement';

export function CustomItemTooltip() {
  const tooltipData = useItemTooltip();
  const mousePosition = useMouseTracker();

  if (!tooltipData || !mousePosition) {
    return null;
  }

  const isMousePointer = mousePosition?.pointerType === 'mouse';
  const yOffset = isMousePointer ? 0 : 40 - mousePosition.height;

  return (
    <NoSsr>
      <Popper
        sx={{
          pointerEvents: 'none',
          zIndex: (theme) => theme.zIndex.modal,
        }}
        open
        placement={isMousePointer ? 'top-end' : 'top'}
        anchorEl={generateVirtualElement(mousePosition)}
        modifiers={[
          {
            name: 'offset',
            options: { offset: [0, yOffset] },
          },
        ]}
      >
        <Paper
          elevation={0}
          sx={{
            m: 1,
            p: 1.5,
            border: 'solid',
            borderWidth: 2,
            borderColor: 'divider',
            minWidth: 180,
          }}
        >
          <Stack spacing={1}>
            {/* Main tooltip content */}
            <Stack direction="row" alignItems="center">
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  backgroundColor: tooltipData.color,
                }}
              />
              <Typography sx={{ ml: 2 }} fontWeight="light">
                {tooltipData.label}
              </Typography>
              <Typography sx={{ ml: 2 }}>{tooltipData.formattedValue}</Typography>
            </Stack>

            {/* Additional details */}
            <Stack spacing={0.5} sx={{ pl: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order No: 100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: 5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Country: US
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Popper>
    </NoSsr>
  );
}