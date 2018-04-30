import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import FeedCard from '../components/FeedCard';

import GET_USER_TWEETS_QUERY from '../graphql/queries/getUserTweets';

const Root = styled.View`
  flex: 1;
  background-color: #f1f6fa;
`;

class ProfileScreen extends Component {
  _renderItem = ({ item }) => <FeedCard {...item} />;

  _renderPlaceholder = ({ item }) => (
    <FeedCard placeholder key={item} isLoaded={this.props.data.loading} />
  );

  render() {
    const { info, data } = this.props;
    return (
      <Root>
        <ProfileHeader {...info} />
        {data.loading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
            contentContainerStyle={{ alignSelf: 'stretch' }}
          />
        ) : (
          <FlatList
            data={data.getUserTweets}
            renderItem={this._renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{ alignSelf: 'stretch' }}
          />
        )}
      </Root>
    );
  }
}

export default compose(
  graphql(GET_USER_TWEETS_QUERY),
  connect(state => ({ info: state.user.info })),
)(ProfileScreen);
