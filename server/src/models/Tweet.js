import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      minlength: [5, 'Min text length is 5'],
      maxlength: [144, 'Max text length is 144'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

TweetSchema.statics = {
  incFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favoriteCount: 1 } }, { new: true });
  },

  decFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favoriteCount: -1 } }, { new: true });
  },
};

export default mongoose.model('Tweet', TweetSchema);
