import React, { Component } from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import FeedCard from '../components/FeedCard/FeedCard';

const Root = styled.View`
  flex: 1;
  padding: 5px;
  background: #eeeeee;
`;

const List = styled.ScrollView`
  /* background: red; */
`;

class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <List>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </List>
      </Root>
    );
  }
}

export default HomeScreen;
