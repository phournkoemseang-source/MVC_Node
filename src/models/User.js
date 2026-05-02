import db from '../config/db.js';

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows.map(row => new User(row.id, row.name, row.email));
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) return null;
            const user = rows[0];
            return new User(user.id, user.name, user.email);
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    static async create(userData) {
        const { name, email } = userData;
        try {
            const [result] = await db.query(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [name, email]
            );
            return new User(result.insertId, name, email);
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async update(id, userData) {
        const { name, email } = userData;
        try {
            const [result] = await db.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [name, email, id]
            );
            if (result.affectedRows === 0) return null;
            return new User(id, name, email);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default User;
