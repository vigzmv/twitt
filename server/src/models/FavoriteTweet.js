import mongoose, { Schema } from 'mongoose';
import Tweet from './Tweet';
import { TWEET_FAVORITED } from '../graphql/resolvers/tweet-resolver';
import { pubsub } from '../config/pubsub';

const FavoriteTweetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
});

FavoriteTweetSchema.index({ userId: 1 }, { unique: true });

FavoriteTweetSchema.methods = {
  async userFavoriteTweet(tweetId) {
    if (this.tweets.some(t => t.equals(tweetId))) {
      this.tweets.pull(tweetId);

      await this.save();
      const tweet = (await Tweet.decFavoriteCount(tweetId)).toJSON();

      pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: { ...tweet } });
      return {
        isFavorite: false,
        ...tweet,
      };
    }
    this.tweets.push(tweetId);
    await this.save();

    const tweet = (await Tweet.incFavoriteCount(tweetId)).toJSON();
    pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: { ...tweet } });

    return {
      isFavorite: true,
      ...tweet,
    };
  },
};

export default mongoose.model('FavoriteTweet', FavoriteTweetSchema);
