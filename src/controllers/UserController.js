import userService from "../services/UserService.js";
import BaseController from "./BaseController.js";

export default class UserController extends BaseController {

    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return this.success(res, "Users fetched successfully", users);
        } catch (error) {
            return this.error(res, "Failed to fetch users", error.statusCode || 500, error.message);
        }
    }

    async getUserById(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            const user = await userService.getUserById(id);
            return this.success(res, "User fetched successfully", user);
        } catch (error) {
            return this.error(res, "Failed to fetch user", error.statusCode || 500, error.message);
        }
    }

    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            return this.success(res, "User created successfully", user, 201);
        } catch (error) {
            return this.error(res, "Failed to create user", error.statusCode || 500, error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            const updatedUser = await userService.updateUser(id, req.body);
            return this.success(res, "User updated successfully", updatedUser);
        } catch (error) {
            return this.error(res, "Failed to update user", error.statusCode || 500, error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id || id <= 0) {
                return this.error(res, "Invalid user ID", 400);
            }

            await userService.deleteUser(id);
            return this.success(res, "User deleted successfully");
        } catch (error) {
            return this.error(res, "Failed to delete user", error.statusCode || 500, error.message);
        }
    }
}