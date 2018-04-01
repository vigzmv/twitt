import React from 'react';
import styled from 'styled-components/native';

const AVATAR_SIZE = 44;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  flex: 0.16;
  padding-left: 16px;
  padding-top: 3px;
  justify-content: center;
  align-self: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
  margin-top: 1px;
`;

const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
  margin-top: 2px;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  align-self: stretch;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  align-self: stretch;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1px;
`;

const MetaText = styled.Text`
  font-size: 14;
  font-weight: 500;
  color: ${props => props.theme.LIGHT_GREY};
`;

const MetaFullName = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${props => props.theme.SECONDARY};
`;

export default function FeedCardHeader() {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: 'https://avatars1.githubusercontent.com/u/22526593?s=460&v=4' }} />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>Pooja Sahore</MetaFullName>
          <MetaText style={{ marginLeft: 5 }}>@PoojaSahore</MetaText>
        </MetaTopContainer>
        <MetaBottomContainer>
          <MetaText>One Day ago</MetaText>
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  );
}
