import AppError from "../domain/errors/AppError.js";
import env from "../config/env.js";

export default function errorHandler(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const isTrustedError = error instanceof AppError || error.isOperational;

    if (!isTrustedError) {
        console.error(error);
    }

    return res.status(statusCode).json({
        success: false,
        message: isTrustedError ? error.message : "Internal server error",
        error: env.nodeEnv === "development" ? error.message : null
    });
}
