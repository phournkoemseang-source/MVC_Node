import mysql from "mysql2/promise";

// create connection
export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user"
});

console.log("Connected to MySQL");