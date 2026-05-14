import express from "express";
import env from "./config/env.js";
import { initializeDatabase } from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});

app.use("/api", userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

initializeDatabase()
    .then(() => {
        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    });

export default app;
