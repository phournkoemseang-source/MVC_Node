import { db } from "../config/db.js";

class User {
      static async create(name, email) {
        const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        return await db.execute(sql, [name, email]);
    }

    static async getAll() {
        const [rows] = await db.execute("SELECT * FROM users");
        return rows;
    }
}

export default User;