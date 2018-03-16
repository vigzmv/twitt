import graphqlDate from 'graphql-date';
import TweetResolver from './tweet-resolver';
import UserResolver from './user-resolver';

export default {
  Date: graphqlDate,

  Query: {
    getTweet: TweetResolver.getTweet,
    getTweets: TweetResolver.getTweets,
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
