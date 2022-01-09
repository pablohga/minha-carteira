import styled from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';

// utilizar o styled.|ELEMENTO DO CSS| para alterar o elemento
export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleLabel = styled.span`
  color: ${(props) => props.theme.colors.white};
`;

// utilizar o styled.(|COMPONENTE|).attrs para personalizar um componente que ja
// vem pronto <ReactSwitchProps> para pegar as propriedade doSwitch
export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
  ({ theme }) => ({
    onColor: theme.colors.info,
    offColor: theme.colors.warning
  })
)<ReactSwitchProps>`
  margin: 0 7px;
`;
