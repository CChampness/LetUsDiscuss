const { Schema, model } = require('mongoose');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // need getter to format
    },
    username: {
      type: String,
      required: true,
    },
    // reactions: [reactionSchema],
    reactions: [
      {
        type: Schema.Types.ObjectId, 
        ref: "reaction"
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves
//  the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
