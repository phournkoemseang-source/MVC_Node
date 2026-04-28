import User from "../models/User.js";

class UserController {
    // create method
    static async create(req, res) {
        try {
            // destructuring object
            const { name, email } = req.body;

            await User.create(name, email);

            res.status(201).json({ message: "User created" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error creating user" });
        }
    }

    static async getAll(req, res) {
        try {
            const users = await User.getAll();

            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users" });
        }
    }
}

export default UserController;