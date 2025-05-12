const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const {initializeDatabase} = require('./database/db');
dotenv.config();
const commentRoutes = require('./server/api/routes/commentRoutes');
const postRoutes = require('./server/api/routes/postRoutes');
const todosRouts = require('./server/api/routes/todoRoutes');
const authRoutes = require('./server/api/routes/authRoutes');
const userRoutes = require('./server/api/routes/userRoutes');

const app = express();
const PORT = process.env.DB_PORT || 3000;

app.use(cors());
app.use(express.json());
initializeDatabase();
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todosRouts);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
