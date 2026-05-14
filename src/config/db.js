import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "./env.js";
import { UserSchema } from "../infrastructure/database/entities/UserSchema.js";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: env.mongoUrl,
    database: env.mongoDatabase,
    synchronize: true,
    logging: env.nodeEnv === "development" ? ["error", "warn"] : ["error"],
    entities: [UserSchema]
});

export async function initializeDatabase() {
    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    await AppDataSource.initialize();
    console.log(`Connected to MongoDB database: ${env.mongoDatabase}`);

    return AppDataSource;
}

export default AppDataSource;
