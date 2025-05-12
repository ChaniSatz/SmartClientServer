const express = require('express');
const { getById, getAll, create, update, deleteItem } = require('../../bl/BL.js');;

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await getAll("posts");
    res.json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', async (req, res) => {
  try {
    const post = await create(req.body, "posts");
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await update(req.params.id, req.body, "posts");
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteItem(req.params.id, "posts");
    res.json(result);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;