import React from 'react';
import styled from 'styled-components/native';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  flex: 0.2;
  padding-left: 14px;
  padding-top: 3px;
  justify-content: center;
  align-self: stretch;
`;

const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;

export default function FeedCardHeader() {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: '' }} />
      </AvatarContainer>
      <MetaContainer />
    </Root>
  );
}
