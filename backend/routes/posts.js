import express from 'express';
const router = express.Router();

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

// GET ALL POSTS
router.get('/', getPosts);

// CREATE POSTS
router.post('/', createPost);

// EDIT POSTS
router.patch('/:id', updatePost);

// DELETE POSTS
router.delete('/:id', deletePost);

// LIKE
router.patch('/:id/likePost', likePost);

export default  router