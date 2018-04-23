import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

import FAVORITE_TWEET_MUTATION from '../../graphql/mutations/favoriteTweet';

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

function FeedCard({ text, user, createdAt, favoriteCount, isFavorite, favorite }) {
  return (
    <Root>
      <FeedCardHeader {...user} createdAt={createdAt} />
      <CardContentContainer>
        <CardContentText>{text}</CardContentText>
      </CardContentContainer>
      <FeedCardBottom
        favoriteCount={favoriteCount}
        isFavorite={isFavorite}
        onFavoritePress={favorite}
      />
    </Root>
  );
}

FeedCard.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  favorite: PropTypes.func.isRequired,
};

FeedCard.defaultProps = {
  isFavorite: false,
};

export default graphql(FAVORITE_TWEET_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    favorite: () =>
      mutate({
        variables: { _id: ownProps._id },
        optimisticResponse: {
          __typename: 'Muatation',
          favoriteTweet: {
            __typename: 'Tweet',
            _id: ownProps._id,
            favoriteCount: ownProps.isFavorite
              ? ownProps.favoriteCount - 1
              : ownProps.favoriteCount + 1,
            isFavorite: !ownProps.isFavorite,
          },
        },
      }),
  }),
})(FeedCard);
