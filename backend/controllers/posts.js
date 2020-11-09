import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// GET ALL POSTS
export const getPosts = async (req, res) => {
    try {
        
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);

    } catch (error) {
        
        res.status(404).json({ message: error.message });

    }
};

// CREATE POSTS
export const createPost = async (req, res) => {
    
    try {
        
        const post = req.body;

        const newPost = new PostMessage(post);

        await newPost.save();

        res.status(201).json(newPost)

    } catch (error) {
        
        res.status(409).json({ message: error.message });

    }

}


// UPDATE POSTS
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}


// DELETE POSTS
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully' })

}

// LIKE
export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const post = await PostMessage.findById(id);

    const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 });

    res.json(updatePost);
}