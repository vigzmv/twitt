import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  height: 170;
  align-self: stretch;
  padding-top: 40;
  background-color: ${props => props.theme.WHITE};
`;

const Heading = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5;
  padding-left: 15;
`;

const Avatar = styled.Image`
  height: 70;
  width: 70;
  border-radius: 35;
  margin-right: 6;
`;

const UsernameContainer = styled.View`
  flex: 1;
  align-self: stretch;
  padding-left: 12;
  padding-top: 9;
`;

const Fullname = styled.Text`
  color: ${props => props.theme.SECONDARY};
  font-weight: bold;
  font-size: 21;
`;

const Username = styled.Text`
  color: ${props => props.theme.SECONDARY};
  /* font-weight: bold; */
  font-size: 17;
  opacity: 0.78;
`;

const MetaContainer = styled.View`
  flex: 0.8;
  flex-direction: row;
`;

const MetaBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MetaText = styled.Text`
  color: ${props => props.theme.SECONDARY};
  font-size: 18;
  font-weight: 600;
  opacity: 0.8;
`;

const MetaTextNumer = styled.Text`
  color: ${props => props.theme.PRIMARY_LIGHTER};
  font-size: 20;
`;

export default function({ firstName, lastName, avatar, username }) {
  return (
    <Root>
      <Heading>
        <Avatar
          source={{ uri: avatar || 'https://avatars1.githubusercontent.com/u/22526593?s=460&v=4' }}
        />
        <UsernameContainer>
          <Fullname>
            {firstName} {lastName}
          </Fullname>
          <Username>@{username}</Username>
        </UsernameContainer>
      </Heading>
      <MetaContainer>
        <MetaBox>
          <MetaText>
            <MetaTextNumer>3 </MetaTextNumer>tweets
          </MetaText>
        </MetaBox>
        <MetaBox>
          <MetaText>
            <MetaTextNumer>3 </MetaTextNumer>likes
          </MetaText>
        </MetaBox>
      </MetaContainer>
    </Root>
  );
}