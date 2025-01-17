import React from 'react';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import Colors from "@/constants/Colors";

const ScatterChart = ({ title, data, domain, chartWidth, chartHeight }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    width={chartWidth}
    height={chartHeight}
    domainPadding={20}
  >
    <VictoryLabel
      text={title}
      x={chartWidth / 2}
      y={30}
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        fill: Colors.colors.text,
        textAnchor: 'middle',
      }}
    />
    <VictoryAxis
      tickFormat={(t) =>
        new Date(t).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }
      tickCount={3}
      style={{
        axis: { stroke: Colors.colors.text },
        tickLabels: { fontSize: 10, fill: Colors.colors.text },
      }}
    />
    <VictoryAxis
      dependentAxis
      domain={domain}
      tickCount={4}
      style={{
        axis: { stroke: Colors.colors.text },
        tickLabels: { fontSize: 10, fill: Colors.colors.text },
      }}
    />
    <VictoryScatter
      data={data}
      size={3}
      style={{
        data: { fill: 'darkorange' },
      }}
    />
  </VictoryChart>
);

export default ScatterChart;
