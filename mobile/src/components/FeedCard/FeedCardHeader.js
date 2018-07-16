import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { distanceInWordsToNow } from 'date-fns';

const AVATAR_SIZE = 46;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const AvatarContainer = styled.View`
  flex: 0.18;
  padding-left: 16px;
  padding-top: 3px;
  justify-content: center;
  align-self: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  align-self: stretch;
`;

const MetaFullName = styled.Text`
  font-size: 16.5;
  font-weight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const MetaTextUsername = styled.Text`
  font-size: 14.2;
  font-weight: 500;
  color: ${props => props.theme.GREY};
  padding-bottom: 1px;
`;

const MetaText = styled.Text`
  font-size: 13.6px;
  font-weight: 500;
  color: ${props => props.theme.GREY_LIGHT};
  padding-bottom: 1px;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  align-self: stretch;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 0.5px;
`;

function FeedCardHeader({ avatar, username, firstName, lastName, createdAt }) {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: avatar }} />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>
            {firstName} {lastName}
          </MetaFullName>
          <MetaTextUsername style={{ marginLeft: 5 }}>@{username}</MetaTextUsername>
        </MetaTopContainer>
        <MetaBottomContainer>
          <MetaText>{distanceInWordsToNow(createdAt)} ago</MetaText>
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  );
}

FeedCardHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default FeedCardHeader;
