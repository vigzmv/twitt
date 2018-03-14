import graphqlDate from 'graphql-date';
import TweetResolver from './tweet-resolver';

export default {
  Date: graphqlDate,

  Query: {
    getTweet: TweetResolver.getTweet,
    getTweets: TweetResolver.getTweets,
  },

  Mutation: {
    createTweet: TweetResolver.createTweet,
    updateTweet: TweetResolver.updateTweet,
    deleteTweet: TweetResolver.deleteTweet,
  },
};
