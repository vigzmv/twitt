import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import FeedCard from '../components/FeedCard/FeedCard';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Root = styled.View`
  flex: 1;
  padding: 5px;
`;

class HomeScreen extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  _renderListItem = ({ item }) => <FeedCard {...item} />;

  render() {
    const { data } = this.props;

    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large" />
        </Root>
      );
    }

    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          keyExtractor={item => item._id}
          renderItem={this._renderListItem}
        />
      </Root>
    );
  }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);
