import graphqlDate from 'graphql-date';
import TweetResolver from './tweet-resolver';
import UserResolver from './user-resolver';
import User from '../../models/User';

export default {
  Date: graphqlDate,

  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getTweet: TweetResolver.getTweet,
    getTweets: TweetResolver.getTweets,
    getUserTweets: TweetResolver.getUserTweets,
    me: UserResolver.me,
  },

  Mutation: {
    createTweet: TweetResolver.createTweet,
    updateTweet: TweetResolver.updateTweet,
    deleteTweet: TweetResolver.deleteTweet,
    signup: UserResolver.signup,
    login: UserResolver.login,
  },
};
