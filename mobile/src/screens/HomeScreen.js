import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import FeedCard from '../components/FeedCard/FeedCard';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import ME_QUERY from '../graphql/queries/me';
import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded';
import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';

import { getUserInfo } from '../actions/user';

const Root = styled.View`
  flex: 1;
  padding: 5px;
`;

class HomeScreen extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: TWEET_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const newTweet = subscriptionData.data.tweetAdded;

        if (!prev.getTweets.find(t => t._id === newTweet._id)) {
          return {
            ...prev,
            getTweets: [{ ...newTweet }, ...prev.getTweets],
          };
        }
      },
    });

    this.props.data.subscribeToMore({
      document: TWEET_FAVORITED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const favTweet = subscriptionData.data.tweetFavorited;
        return {
          ...prev,
          getTweets: prev.getTweets.map(
            tweet =>
              tweet._id === favTweet._id
                ? { ...tweet, favoriteCount: favTweet.favoriteCount }
                : tweet,
          ),
        };
      },
    });
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };

  _renderListItem = ({ item }) => <FeedCard {...item} />;

  _renderPlaceholder = ({ item }) => (
    <FeedCard placeholder key={item} isLoaded={this.props.data.loading} />
  );

  render() {
    const { data } = this.props;

    if (data.loading) {
      return (
        <Root>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={[1, 2, 3, 4, 5]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
          />
        </Root>
      );
    }

    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets.filter(
            (obj, pos, arr) => arr.map(mapObj => mapObj._id).indexOf(obj._id) === pos,
          )}
          keyExtractor={item => item._id}
          renderItem={this._renderListItem}
        />
      </Root>
    );
  }
}

export default withApollo(
  compose(connect(undefined, { getUserInfo }), graphql(GET_TWEETS_QUERY))(HomeScreen),
);
