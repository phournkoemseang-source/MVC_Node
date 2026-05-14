import { EntitySchema } from "typeorm";
import User from "../../../domain/entities/User.js";

export const UserSchema = new EntitySchema({
    name: "User",
    target: User,
    collectionName: "users",
    columns: {
        id: {
            type: "objectId",
            objectId: true,
            generated: true,
            primary: true
        },
        name: {
            type: String,
            nullable: false
        },
        email: {
            type: String,
            nullable: false,
            unique: true
        },
        createdAt: {
            type: Date,
            createDate: true
        },
        updatedAt: {
            type: Date,
            updateDate: true
        }
    }
});
