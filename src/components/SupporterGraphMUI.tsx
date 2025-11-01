// PENDING TODO: FIND A WAY TO DISPLAY THE POPUP DETAILS UPON RANGE HOVER. CURRENT
// THE USER IS FORCED TO OVER OVER THE SPECIFIC POINT

// PENDING TODO: FIND A WAY TO REMOVE THE DOTS


// WHY HAD YOU TO SWITCH FROM LINE CHART TO THE CUSTOM CHART WITH CUSTOM TOOLTIP? BECAUSE I COULD NOT ADD ADDITIONAL DETAILS IN THE TOOLTIP OF THE LINE CHART? IF SO, IS THERE A WAY TO DO IT?

// PREPARE ALL OPTIONS AND YOU WILL DEMO THEM TO FBN AND MAKE A CONCLUSION AFTER THAT

// THESE ARE THE OPTIONS YOU WILL DEMO TO FBN: LINE CHART WITHOUT ADDITIONAL DETAILS, CUSTOM CHART WITH ADDITIONAL DETAILS, LINE CHART WITH ADDITIONAL DETAILS (IF POSSIBLE)

// WHEN I USED LINE CHART WITH CUSTOM TOOLTIP PASSED, THE DATA POINTS WERE DISPLAYED. WHEN HID THEM
// I HOVERED AND COULD NOT SEE THE TOOLTIP. SO IT SEEMS THAT THE TOOLTIP IS TIED TO THE DATA POINTS WHEN
// PASSING A CUSTOM TOOLTIP COMPONENT. IS THERE A WAY TO DETACH THE TOOLTIP FROM THE DATA POINTS?



// ICYINGENZI UGOMBA GUKORA EJO KU CYUMWERU 2.11.2025 NUGUKORA DEMO CALL MU GITONDO NA 
// FBN UKAMWEREKA PROGRESS YAWE YOSE NIBA BYOSE WAGERAGEJE MAZE UKUMVA UKO AKUBWIRA
// UZABANZE URABURE NOEL MBERE YA DEMO CALL UKAMUBWIRA IBYO WAKOZE KUGIRA NGO UTAZAGONGANA NA 
// ALBERT


import * as React from 'react';
import { LineChart, ChartsReferenceLine } from '@mui/x-charts';
import { transformSupporterData } from '../utils/transformSupporterData';
import type { SupporterGraphData } from '../types/SupporterGraphData';
import { CustomItemTooltip } from './SupporterCustomItemTooltip';

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
      <LineChart
        height={400}
        margin={{ bottom: 86 }}
        dataset={chartData}
        xAxis={[{ scaleType: 'point', dataKey: 'xLabel' }]}
        series={[
          {
            dataKey: 'cumulativePlanned',
            label: 'Planned',
            color: '#1976d2',
            showMark: false,
          },
          {
            dataKey: 'cumulativeActual',
            label: 'Actual',
            color: '#2e7d32',
            showMark: false,
          },
          {
            dataKey: 'cumulativeForecast',
            label: 'Forecast',
            color: '#fbc02d',
            showMark: false,
          },
          {
            dataKey: 'cumulativeDriftLimit',
            label: 'Drift Limit',
            color: '#ef6c00',
            showMark: false,
          },
        ]}
        tooltip={{
          trigger: 'axis',
        }}
        slots={{
          axisContent: () => (
            <CustomItemTooltip orders={rawData.orders} chartData={chartData} />
          ),
        }}
        slotProps={{
          legend: {
            direction: 'row', // Optional: 'column' for vertical layout
            position: { vertical: 'bottom', horizontal: 'middle' },
          },
        }}
      >
        {rawData.current_time_index != null &&
          rawData.orders[rawData.current_time_index] && (
            <ChartsReferenceLine
              x={`${rawData.orders[rawData.current_time_index].order_name}`}
              lineStyle={{ stroke: 'gray', strokeDasharray: '4 2' }}
              label="Now"
              labelStyle={{ fill: 'gray', fontSize: 12 }}
            />
          )}

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
      </LineChart>
    </div>
  );
};

export default SupporterGraphMUI;



// PENDING TODO: FIND A WAY TO DISPLAY THE POPUP DETAILS UPON RANGE HOVER. CURRENT
// THE USER IS FORCED TO OVER OVER THE SPECIFIC POINT

// PENDING TODO: FIND A WAY TO REMOVE THE DOTS


// WHY HAD YOU TO SWITCH FROM LINE CHART TO THE CUSTOM CHART WITH CUSTOM TOOLTIP? BECAUSE I COULD NOT ADD ADDITIONAL DETAILS IN THE TOOLTIP OF THE LINE CHART? IF SO, IS THERE A WAY TO DO IT?

// PREPARE ALL OPTIONS AND YOU WILL DEMO THEM TO FBN AND MAKE A CONCLUSION AFTER THAT

// THESE ARE THE OPTIONS YOU WILL DEMO TO FBN: LINE CHART WITHOUT ADDITIONAL DETAILS, CUSTOM CHART WITH ADDITIONAL DETAILS, LINE CHART WITH ADDITIONAL DETAILS (IF POSSIBLE)

// WHEN I USED LINE CHART WITH CUSTOM TOOLTIP PASSED, THE DATA POINTS WERE DISPLAYED. WHEN HID THEM
// I HOVERED AND COULD NOT SEE THE TOOLTIP. SO IT SEEMS THAT THE TOOLTIP IS TIED TO THE DATA POINTS WHEN
// PASSING A CUSTOM TOOLTIP COMPONENT. IS THERE A WAY TO DETACH THE TOOLTIP FROM THE DATA POINTS?



// ICYINGENZI UGOMBA GUKORA EJO KU CYUMWERU 2.11.2025 NUGUKORA DEMO CALL MU GITONDO NA 
// FBN UKAMWEREKA PROGRESS YAWE YOSE NIBA BYOSE WAGERAGEJE MAZE UKUMVA UKO AKUBWIRA
// UZABANZE URABURE NOEL MBERE YA DEMO CALL UKAMUBWIRA IBYO WAKOZE KUGIRA NGO UTAZAGONGANA NA 
// ALBERT
