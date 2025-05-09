const express = require('express');
const { getById, getByPostId, create, deleteItem, update } = require('../../bl/BL.js');

const router = express.Router();


// Get comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await getById(req.params.id, "comments");
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error('Error getting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const postId = req.query.postId;
    if (!postId) return res.status(400).json({ message: 'Missing postId' });

    const todos = await getByPostId(postId, 'commments');;
    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create comment
router.post('/', async (req, res) => {
  try {
    const comment = await create(req.body, "comments");;
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update comment
router.put('/:id', async (req, res) => {
  try {
    const comment = await update(req.params.id, req.body, "comments");
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteItem(req.params.id, "comments");
    res.json(result);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;