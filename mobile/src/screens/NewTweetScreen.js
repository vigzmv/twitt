import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import { colors } from '../utils/constants';
import CREATE_TWEET_MUTATION from '../graphql/mutations/createTweet';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Root = styled.View`
  background-color: ${props => props.theme.WHITE};
  flex: 1;
  align-items: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  padding-top: 24;
`;

const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  multiline: true,
  textAlignVertical: 'top',
  maxLength: 140,
  numberOfLines: 7,
  blurOnSubmit: false,
  selectionColor: colors.PRIMARY_LIGHTEST,
  placeholder: "What's happening?",
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  font-size: 21;
  color: ${props => props.theme.SECONDARY};
`;

const TweetButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? props.theme.PRIMARY_LIGHTEST : props.theme.PRIMARY_LIGHTER};
  justify-content: center;
  align-items: center;
  width: 96;
  height: 44;
  border-radius: 22;
  position: absolute;
  top: 56%;
  right: 0;
`;

const TweetButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-size: 20;
  padding-bottom: 1;
`;

const TweetLength = styled.Text`
  font-size: 20;
  color: ${props => props.theme.PRIMARY_LIGHTEST};
  position: absolute;
  top: 46%;
  right: 8;
`;

class NewTweetScreen extends Component {
  state = {
    text: '',
    tweeting: false,
  };

  get _tweetLength() {
    return 140 - this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  _onChange = text => this.setState({ text });

  _onCreateTweet = async () => {
    const { user } = this.props;
    this.setState({ tweeting: true });

    await this.props.mutate({
      variables: {
        text: this.state.text,
      },
      opimisticResponse: {
        __typename: 'Mutation',
        createTweet: {
          __typename: 'Tweet',
          _id: Math.random(Math.random * -10000000),
          text: this.state.text,
          favoriteCount: 0,
          createdAt: new Date(),
          user: {
            __typename: 'User',
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          },
        },
      },
      update: (store, { data: { createTweet } }) => {
        const data = store.readQuery({ query: GET_TWEETS_QUERY });
        if (!data.getTweets.find(t => t._id === createTweet._id)) {
          store.writeQuery({
            query: GET_TWEETS_QUERY,
            data: { getTweets: [{ ...createTweet }, ...data.getTweets] },
          });
        }
      },
    });

    Keyboard.dismiss();
    this.props.navigation.goBack(null);
    this.setState({ tweeting: false });
  };

  render() {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this._onChange} />
          <TweetLength>{this._tweetLength}</TweetLength>
          <TweetButton disabled={this._buttonDisabled} onPress={this._onCreateTweet}>
            {this.state.tweeting ? (
              <Loading color={colors.WHITE} size={26} />
            ) : (
              <TweetButtonText>{`T\u200Aw\u200Ae\u200Ae\u200At`}</TweetButtonText>
            )}
          </TweetButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  graphql(CREATE_TWEET_MUTATION),
  connect(state => ({
    user: state.user.info,
  })),
)(NewTweetScreen);
