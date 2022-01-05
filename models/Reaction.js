const { Schema, model } = require('mongoose');

// Schema for what makes up a reaction
const reactionSchema = new Schema(
  // {
  //   reactionId: {
  //     type: Schema.Types.ObjectId,
  //     // Default value is set to a new ObjectId
  //   },
  //   reactionBody: {
  //     type: String,
  //     required: true,
  //     max_length: 280,
  //   },
  //   username: {
  //     type: String,
  //     required: true,
  //   },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // },
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  // } 
);

// This will not be a model, but rather will be used as
// the `reaction` field's subdocument schema in the `Thought` model.

// Initialize the Comment model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
