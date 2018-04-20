import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  margin-right: ${props => (props.side === 'right' ? 14 : 0)};
  margin-left: ${props => (props.side === 'left' ? 14 : 0)};
  margin-top: 2;
  justify-content: center;
  align-items: center;
`;

export default function ButtonHeader(props) {
  return <Button {...props} />;
}
