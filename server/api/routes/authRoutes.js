const express = require('express');
const { loginUser } = require('../../bl/authController');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await loginUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
// status
    res.json(
      user
      // success: true,
      // user: {
      //   id: user.id,
      //   username: user.username
      // },
      // message: 'Login successful'
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
