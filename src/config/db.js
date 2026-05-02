import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "user",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;

(async () => {
    try {
        const conn = await db.getConnection();
        conn.release();
        console.log("Connected to MySQL");
    } catch (error) {
        console.warn("MySQL is not reachable yet. Start your MySQL service and retry requests.");
    }
})();
