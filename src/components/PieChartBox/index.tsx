import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight
} from './styles';

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relaçao</h2>
      <LegendContainer>
        {data.map((indicator) => (
          <Legend color={indicator.color}>
            <div>{indicator.percent}</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="percent">
            {data.map((indicator) => (
              <Cell key={indicator.name} fill={indicator.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartBox;