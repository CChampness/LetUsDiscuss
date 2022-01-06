const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Use Mongoose match to validate
    },
    meta: {
      thoughtcount: Number,
      friendcount: Number,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  // Need virtual friendCount
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

  userSchema
  .virtual('thoughtCount')
  // BTW, how much thinking has this user been doing?
  .get(function () {
    return this.thoughts.length;
  });

const User = model('user', userSchema);

module.exports = User;
