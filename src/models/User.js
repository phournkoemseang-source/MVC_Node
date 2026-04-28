import { db } from '../config/db.js';

export class User {

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // convert database row → User object
    static fromRow(row) {
        return new User(row.id, row.name, row.email);
    }

    // get all users
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM users');

        // array destructuring example (optional idea)
        return rows.map(row => User.fromRow(row));
    }

    // get one user by id
    static async getById(id) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        return rows.length ? User.fromRow(rows[0]) : null;
    }

    // create new user
    static async create(name, email) {
        const [result] = await db.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        return new User(result.insertId, name, email);
    }

    // update user
    static async update(id, name, email) {
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );

        if (result.affectedRows === 0) return null;

        return new User(id, name, email);
    }

    // delete user
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        return result.affectedRows > 0;
    }
}