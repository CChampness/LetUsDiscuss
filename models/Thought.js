const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    iso: {
      type: Date,
      default: Date.now
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  } 
);

reactionSchema
  .virtual("createdAt")
  .get(function() {
    return this.iso.toLocaleString('en-US');
});

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
    iso: {
      type: Date,
      default: Date.now()
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema
  .virtual("createdAt")
  .get(function() {
    return this.iso.toLocaleString('en-US');
});

// Retrieves the length of the thought's `reactions` array
thoughtSchema
  .virtual("reactionCount")
  .get(function() {
    return this.reactions.length;
});

// Remove thought from user when it is deleted
thoughtSchema.pre('remove', function(next) {
  console.log("removing:",this._id)
  User.update(
      { thoughtId : this._id}, 
      { $pull: { thoughtId: this._id } },
      { multi: true })
  .exec();
  next();
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
