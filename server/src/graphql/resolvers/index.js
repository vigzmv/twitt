import TweetResolver from './tweet-resolver';

export default {
  Query: { getTweets: TweetResolver.getTweets },
};
