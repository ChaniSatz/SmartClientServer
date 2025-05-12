const express = require('express');
const { getById, getByUserId, deleteItem, create, update } = require('../../bl/BL.js');

const router = express.Router();

// Get todos by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const todos = await getByUserId(userId, 'todos');
    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await getByUserId(parseInt(req.params.id), "todos");
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error getting todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create todo
router.post('/', async (req, res) => {
  try {
    const todo = await create(req.body, "todos");
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await update(req.params.id, req.body,"todos");
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteItem(req.params.id, "todos");
    res.json(result);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;