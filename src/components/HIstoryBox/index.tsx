import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts';
import { Container } from './styles';

const HistoryBox: React.FC = () => (
  <Container>
    <h2>Histórico de Saldos</h2>

    <ResponsiveContainer>
      <LineChart></LineChart>
    </ResponsiveContainer>
  </Container>
);

export default HistoryBox;
