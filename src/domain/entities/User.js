export default class User {
    constructor({ id = null, name, email, createdAt = null, updatedAt = null } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static create({ name, email }) {
        return new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    update({ name, email }) {
        if (name !== undefined) {
            this.name = name.trim();
        }

        if (email !== undefined) {
            this.email = email.trim().toLowerCase();
        }

        this.updatedAt = new Date();
        return this;
    }

    toJSON() {
        return {
            id: this.id?.toString(),
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
