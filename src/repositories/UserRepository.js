import db from '../config/db.js';
import User from '../models/UserModel.js';

class UserRepository {
    async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows.map(row => new User(row.id, row.name, row.email));
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const user = rows[0];
        return new User(user.id, user.name, user.email);
    }

    async create(userData) {
        const { name, email } = userData;
        const [result] = await db.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        return new User(result.insertId, name, email);
    }

    async update(id, userData) {
        const { name, email } = userData;
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        if (result.affectedRows === 0) return null;
        return new User(id, name, email);
    }

    async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default new UserRepository();