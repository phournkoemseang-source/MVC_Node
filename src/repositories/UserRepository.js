import { ObjectId } from "mongodb";
import AppDataSource from "../config/db.js";
import User from "../domain/entities/User.js";

class UserRepository {
    get repository() {
        return AppDataSource.getMongoRepository(User);
    }

    toObjectId(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }

        return new ObjectId(id);
    }

    async findAll() {
        return this.repository.find({
            order: {
                createdAt: "DESC"
            }
        });
    }

    async findById(id) {
        const objectId = this.toObjectId(id);

        if (!objectId) {
            return null;
        }

        return this.repository.findOneBy({ _id: objectId });
    }

    async findByEmail(email) {
        return this.repository.findOneBy({
            email: email.trim().toLowerCase()
        });
    }

    async create(userData) {
        const user = User.create(userData);
        return this.repository.save(user);
    }

    async update(id, userData) {
        const user = await this.findById(id);

        if (!user) {
            return null;
        }

        user.update(userData);
        return this.repository.save(user);
    }

    async delete(id) {
        const objectId = this.toObjectId(id);

        if (!objectId) {
            return false;
        }

        const result = await this.repository.deleteOne({ _id: objectId });
        return result.deletedCount > 0;
    }
}

export default new UserRepository();
