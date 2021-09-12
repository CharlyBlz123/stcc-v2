import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';


const Chart = ({ chartInformation, registries }) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{ chartInformation.title }</Title>
      <ResponsiveContainer>
        <LineChart
          data={registries}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
           <XAxis dataKey="time" />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              { chartInformation.unitOfMeasurement }
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey={chartInformation.property} stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;