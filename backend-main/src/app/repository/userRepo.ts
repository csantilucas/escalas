import type { User } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";
import { BaseRepository } from "./baseRepo.js";

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(prisma.user);
    }

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
            include: { plantao: true }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email },
            include: { plantao: true }
        });
    }

    async updateUser(id: string, data: any): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data,
            include: { plantao: true }
        });
    }

    async deleteUser(id: string): Promise<User> {
        return await prisma.user.delete({
            where: { id }
        });
    }
}