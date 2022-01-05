const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  // {
  //   username: {
  //     type: String,
  //     unique: true,
  //     required: true,
  //     trimmed: true,
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     // Use Mongoose match to validate
  //   },
  //   thoughts: [thoughtSchema],
  //   friends: [userSchema],
  // },
  // // Need virtual friendCount
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  // }
);

const User = model('user', userSchema);

module.exports = User;
