import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
  min-height: 158;
  background-color: ${props => props.theme.WHITE};
  width: 100%;
  shadow-color: ${props => props.theme.SECONDARY};
  shadow-offset: 0 2px;
  shadow-radius: 2;
  shadow-opacity: 0.1;
  elevation: 2;
  margin: 4.4px 0;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 24px 10px 16px;
`;

const CardContentText = styled.Text`
  font-size: 14.5;
  text-align: left;
  color: ${props => props.theme.BLACK_LIGHT};
`;

export default function FeedCard({ text, user, createdAt, favoriteCount }) {
  return (
    <Root>
      <FeedCardHeader {...user} createdAt={createdAt} />
      <CardContentContainer>
        <CardContentText>{text}</CardContentText>
      </CardContentContainer>
      <FeedCardBottom favoriteCount={favoriteCount} />
    </Root>
  );
}
