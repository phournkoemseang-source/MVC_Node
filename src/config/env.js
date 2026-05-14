import "dotenv/config";

const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 3000,
    mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017",
    mongoDatabase: process.env.MONGO_DATABASE || "clean_architecture_api"
};

export default env;
