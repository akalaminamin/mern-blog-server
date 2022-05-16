const { Schema, model } = require("mongoose");
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    body: {
      type: String,
      required: true,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: String,
    readtime: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
module.exports = Post;
