import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  /* margin-right: ${props => (props.side === 'right' ? 14 : 0)}; */
  /* margin-left: ${props => (props.side === 'left' ? 14 : 0)}; */
  justify-content: center;
  align-items: center;
  padding: 9px 13px;
`;

export default function ButtonHeader(props) {
  return <Button {...props} />;
}
