import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
  min-height: 180;
  background-color: ${props => props.theme.WHITE};
  width: 100%;
  shadow-color: ${props => props.theme.SECONDARY};
  shadow-offset: 0 2px;
  shadow-radius: 2;
  shadow-opacity: 0.1;
  elevation: 2.6;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 24px 10px 16px;
`;

const CardContentText = styled.Text`
  font-size: 14;
  text-align: left;
`;

export default function FeedCard() {
  return (
    <Root>
      <FeedCardHeader />
      <CardContentContainer>
        <CardContentText>
          lorem20 ismpua asd as a fasd ada sd asd as dasdasd asd asd asdasda ea wewe asda afadad
          adasda
        </CardContentText>
      </CardContentContainer>
      <FeedCardBottom />
    </Root>
  );
}
