import User from "../models/User.js";
import BaseController from "./BaseController.js";

export default class UserController extends BaseController {
   
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            return this.success(res, "Users fetched successfully", users);
        } catch (error) {
            return this.error(res, "Failed to fetch users", 500, error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const id = Number(req.params.id);

            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            const user = await User.findById(id);

            if (!user) {
                return this.error(res, "User not found", 404);
            }

            return this.success(res, "User fetched successfully", user);
        } catch (error) {
            return this.error(res, "Failed to fetch user", 500, error.message);
        }
    }

    // Create user
    async createUser(req, res) {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return this.error(res, "Name and email are required", 400);
            }

            const user = await User.create({
                name: name.trim(),
                email: email.trim()
            });

            return this.success(res, "User created successfully", user, 201);
        } catch (error) {
            return this.error(res, "Failed to create user", 500, error.message);
        }
    }

    // Update user
    async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            const { name, email } = req.body;

            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            if (!name && !email) {
                return this.error(res, "Name or email is required", 400);
            }

            const oldUser = await User.findById(id);

            if (!oldUser) {
                return this.error(res, "User not found", 404);
            }

            const updatedUser = await User.update(id, {
                name: name ? name.trim() : oldUser.name,
                email: email ? email.trim() : oldUser.email
            });

            return this.success(res, "User updated successfully", updatedUser);
        } catch (error) {
            return this.error(res, "Failed to update user", 500, error.message);
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);

            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            const user = await User.findById(id);

            if (!user) {
                return this.error(res, "User not found", 404);
            }

            await User.delete(id);

            return this.success(res, "User deleted successfully");
        } catch (error) {
            return this.error(res, "Failed to delete user", 500, error.message);
        }
    }
}