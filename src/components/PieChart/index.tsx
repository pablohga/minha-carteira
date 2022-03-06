import React from 'react';
/* import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'; */

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight
} from './styles';

const PieChart: React.FC = () => (
  <Container>
    <SideLeft>
      <h2>Relaçao</h2>
      <LegendContainer>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>
    <SideRight></SideRight>
  </Container>
);

export default PieChart;
