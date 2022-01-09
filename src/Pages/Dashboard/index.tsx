import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Container } from './styles';
import SelectInput from '../../components/SelectInput';

const Dashboard: React.FC = () => {
  const options = [
    { value: 'Ana', label: 'Ana' },
    { value: 'Beatriz', label: 'Beatriz' },
    { value: 'Maria', label: 'Maria' }
  ];
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#fff">
        <SelectInput options={options}></SelectInput>
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
