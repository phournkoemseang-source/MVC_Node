import userService from "../services/UserService.js";
import BaseController from "./BaseController.js";

export default class UserController extends BaseController {
    constructor(service = userService) {
        super();
        this.userService = service;
    }

    async getUsers(req, res) {
        const users = await this.userService.getAllUsers();
        return this.success(res, "Users fetched successfully", users);
    }

    async getUserById(req, res) {
        const user = await this.userService.getUserById(req.params.id);
        return this.success(res, "User fetched successfully", user);
    }

    async createUser(req, res) {
        const user = await this.userService.createUser(req.body);
        return this.success(res, "User created successfully", user, 201);
    }

    async updateUser(req, res) {
        const updatedUser = await this.userService.updateUser(req.params.id, req.body);
        return this.success(res, "User updated successfully", updatedUser);
    }

    async deleteUser(req, res) {
        await this.userService.deleteUser(req.params.id);
        return this.success(res, "User deleted successfully");
    }
}
