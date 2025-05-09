const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  generateFakeData();
});

// פונקציה שמכניסה נתונים
const insertData = (query, data) => {
  return new Promise((resolve, reject) => {
    db.query(query, [data], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// יצירת הנתונים הדמיים והכנסתם לפי הסדר הנכון
const generateFakeData = async () => {
  try {
    // === Insert users ===
    const users = [];
    for (let i = 0; i < 10; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      users.push([username, email]);
    }

    const userInsertResult = await insertData(
      `INSERT INTO users (username, email) VALUES ?`,
      users
    );

    const userIds = Array.from({ length: userInsertResult.affectedRows }, (_, i) =>
      userInsertResult.insertId + i
    );

    // === Insert todos ===
    const todos = [];
    for (let i = 0; i < 20; i++) {
      const userId = faker.helpers.arrayElement(userIds);
      const title = faker.lorem.words(5);
      const completed = faker.datatype.boolean();
      todos.push([userId, title, completed ? 1 : 0]);
    }

    await insertData(
      `INSERT INTO todos (user_id, title, completed) VALUES ?`,
      todos
    );

    // === Insert posts ===
    const posts = [];
    for (let i = 0; i < 10; i++) {
      const userId = faker.helpers.arrayElement(userIds);
      const title = faker.lorem.sentence();
      const body = faker.lorem.paragraph();
      posts.push([userId, title, body]);
    }

    const postInsertResult = await insertData(
      `INSERT INTO posts (user_id, title, body) VALUES ?`,
      posts
    );

    const postIds = Array.from({ length: postInsertResult.affectedRows }, (_, i) =>
      postInsertResult.insertId + i
    );

    // === Insert comments ===
    const comments = [];
    for (let i = 0; i < 30; i++) {
      const postId = faker.helpers.arrayElement(postIds);
      const userId = faker.helpers.arrayElement(userIds);
      const body = faker.lorem.sentence();
      comments.push([postId, userId, body]);
    }

    await insertData(
      `INSERT INTO comments (post_id, user_id, body) VALUES ?`,
      comments
    );

    console.log("All fake data inserted successfully!");

  } catch (err) {
    console.error("Error during data generation:", err.message);
  } finally {
    db.end();
  }
};
