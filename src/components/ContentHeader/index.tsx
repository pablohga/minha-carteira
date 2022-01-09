import React from 'react';

import { Container, TitleContainer, Controllers } from './styles';

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  title,
  lineColor,
  children
}) => {
  /*   const frutas = [
    { value: 'Maça', label: 'Maça' },
    { value: 'Uva', label: 'Uva' },
    { value: 'Banana', label: 'Banana' }
  ];

  const carros = [
    { value: 'Zoe', label: 'Zoe' },
    { value: 'Toyta HXR', label: 'Toyta HXR' },
    { value: 'Lifie', label: 'Lifie' }
  ]; */
  return (
    <Container>
      <TitleContainer lineColor={lineColor}>
        <h1>{title}</h1>
      </TitleContainer>
      <Controllers>
        {children}
        {/*        <SelectInput options={frutas} />
        <SelectInput options={carros} /> */}
      </Controllers>
    </Container>
  );
};

export default ContentHeader;
