import userRepository from "../repositories/UserRepository.js";
import AppError from "../domain/errors/AppError.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class UserService {
    constructor(repository = userRepository) {
        this.userRepository = repository;
    }

    validateId(id) {
        if (!id) {
            throw new AppError("Invalid user ID", 400);
        }
    }

    validateCreatePayload(userData) {
        const { name, email } = userData;
        const normalizedName = name?.trim();
        const normalizedEmail = email?.trim();

        if (!normalizedName || !normalizedEmail) {
            throw new AppError("Name and email are required", 400);
        }

        if (!emailPattern.test(normalizedEmail)) {
            throw new AppError("Email format is invalid", 400);
        }
    }

    validateUpdatePayload(userData) {
        const { name, email } = userData;
        const normalizedName = name?.trim();
        const normalizedEmail = email?.trim();

        if (name === undefined && email === undefined) {
            throw new AppError("At least one field is required to update", 400);
        }

        if (name !== undefined && !normalizedName) {
            throw new AppError("Name cannot be empty", 400);
        }

        if (email !== undefined && !emailPattern.test(normalizedEmail)) {
            throw new AppError("Email format is invalid", 400);
        }
    }

    async ensureEmailIsAvailable(email, currentUserId = null) {
        if (!email) {
            return;
        }

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser && existingUser.id?.toString() !== currentUserId) {
            throw new AppError("Email already exists", 409);
        }
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(id) {
        this.validateId(id);

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }

    async createUser(userData) {
        this.validateCreatePayload(userData);
        await this.ensureEmailIsAvailable(userData.email);

        return this.userRepository.create(userData);
    }

    async updateUser(id, userData) {
        this.validateId(id);
        this.validateUpdatePayload(userData);
        await this.getUserById(id);
        await this.ensureEmailIsAvailable(userData.email, id);

        return this.userRepository.update(id, userData);
    }

    async deleteUser(id) {
        this.validateId(id);
        await this.getUserById(id);

        return this.userRepository.delete(id);
    }
}

export default new UserService();
