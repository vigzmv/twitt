import mongoose, { Schema } from 'mongoose';
import Tweet from './Tweet';

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
      const tweet = await Tweet.decFavoriteCount(tweetId);

      return {
        isFavorite: false,
        ...tweet.toJSON(),
      };
    }
    this.tweets.push(tweetId);
    await this.save();

    const tweet = await Tweet.incFavoriteCount(tweetId);

    return {
      isFavorite: true,
      ...tweet.toJSON(),
    };
  },
};

export default mongoose.model('FavoriteTweet', FavoriteTweetSchema);
