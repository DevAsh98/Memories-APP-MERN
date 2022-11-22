import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  //every post will have these properties
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, //images going to be coverted using base 64
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema); //converting to Mongoose model

export default PostMessage;
