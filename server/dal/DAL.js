const mysql = require('mysql2'); 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cs0583299351!',
    database: 'chaniandayala'
});

class DAL {
    constructor() { }

    findUserByUsername(username, table) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT u.*, p.password_hash 
            FROM ${table} u
            JOIN passwords p ON u.id = p.user_id
            WHERE u.username = ?
          `;

            pool.execute(query, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); 
                }
            });
        });
    }

    getById(id, table) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE id = ?`;
            pool.execute(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    getAll(table) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table}`;
            pool.execute(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    getByUserId(userId, table) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE user_id = ?`;
            pool.execute(query, [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    create(data, table) {
        return new Promise((resolve, reject) => {
            const columns = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map(() => '?').join(', ');

            const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

            pool.execute(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId); 
                }
            });
        });
    }

    update(id, data, table) {
        return new Promise((resolve, reject) => {
            const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
            const values = Object.values(data);
            values.push(id);

            const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

            pool.execute(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    delete(id, table) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE id = ?`;
            pool.execute(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    getByPostId(postId, table) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE post_id = ?`;
            pool.execute(query, [postId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = new DAL();
