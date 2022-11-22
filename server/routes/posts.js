//all the routes that has something with posts

import express from 'express';

import auth from '../middleware/auth.js';

import {getPostsBySearch, getPosts, createPosts, updatePost, deletePost,likePost, getPost, commentPost } from '../controllers/posts.js';

const router = express.Router();  //using express's router


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost); //getting single post for details page
router.post('/',auth, createPosts);  //middleswares added as only loggedin users will be able to create, update, delete, like post
router.patch('/:id',auth, updatePost);  //userId will be passed to the next action from auth to createPosts, updatePost ...etc
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth, commentPost);

export default router;