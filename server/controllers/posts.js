//handlers for our routes
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query; //the page number front client

  try {
    const LIMIT = 6; //per page item
    const startIndex = (Number(page) - 1) * LIMIT; //sets the startIndex of every page.. staring from 0
    const total = await PostMessage.countDocuments({}); //gives the count of the all the docs stored in the backend

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); //gets the latest item (sort), upto 8 item, an skips other page item

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); //case insensitive => i - ignore
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    }).sort({ _id: -1 }); //search by either by tags or by title && we are sending the search string containing tags seperated by comma

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body; //getting the post from body request

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  }); //instance of the schema

  try {
    await newPost.save();

    res.status(201).json(newPost); //201 -> successful creation
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //renaming the id _id to allign with the name of the property
  const post = req.body;

  //checking if _id is really a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that Id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  //checking if _id is really a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with Id: ${_id}`);

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthintacated" });
  //checking if _id is really a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that Id");

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //if index not found i.e. the user has not liked; so like button will be enabled
    post.likes.push(req.userId);
  } else {
    //if some index found i.e. the user has already liked; so unlike button will be enabled
    post.likes = post.likes.filter((id) => id !== String(req.userId)); //deleting the already like
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params; //id coming from route '/:id/commentPost'
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
