import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import FeedCard from '../components/FeedCard/FeedCard';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import ME_QUERY from '../graphql/queries/me';
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

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
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

export default withApollo(
  compose(connect(undefined, { getUserInfo }), graphql(GET_TWEETS_QUERY))(HomeScreen),
);
