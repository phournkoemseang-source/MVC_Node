import { User } from '../models/User.js';

export class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params; // destructuring

            const user = await User.getById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUser(req, res) {
        try {
            const { name, email } = req.body; // destructuring

            if (!name || !email) {
                return res.status(400).json({ error: 'name and email are required' });
            }

            const user = await User.create(name, email);

            res.status(201).json({
                message: 'User created',
                data: user
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(400).json({ error: 'name and email are required' });
            }

            const user = await User.update(id, name, email);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({
                message: 'User updated',
                data: user
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const deleted = await User.delete(id);

            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'User deleted'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
