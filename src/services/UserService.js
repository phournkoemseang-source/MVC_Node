import userRepository from '../repositories/UserRepository.js';

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    async createUser(userData) {
        const { name, email } = userData;
        if (!name || !email) {
            const error = new Error('Name and email are required');
            error.statusCode = 400;
            throw error;
        }
        return await userRepository.create({
            name: name.trim(),
            email: email.trim()
        });
    }

    async updateUser(id, userData) {
        const { name, email } = userData;
        
        const existingUser = await this.getUserById(id);

        const updatedData = {
            name: name ? name.trim() : existingUser.name,
            email: email ? email.trim() : existingUser.email
        };

        return await userRepository.update(id, updatedData);
    }

    async deleteUser(id) {
        await this.getUserById(id);
        return await userRepository.delete(id);
    }
}

export default new UserService();