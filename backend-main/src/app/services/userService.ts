import type { User as PrismaUser } from "../../../generated/prisma/index.js";

export interface UserInput {
    name: string;
    email: string;
    pass?: string | null;
    id_atendente?: string | null;
    typeUser?: any;
}

import { UserRepository } from "../repository/userRepo.js";

export class UserService {
    private user: UserRepository;

    constructor(userRepository: UserRepository) {
        this.user = userRepository;
    }

    async createUser(data: UserInput): Promise<PrismaUser> {
        const user = await this.user.create(data as any);
        return user;
    }

    async getUserById(id: string): Promise<PrismaUser | null> {
        return await this.user.findById(id);
    }

    async getUserByEmail(email: string): Promise<PrismaUser | null> {
        const user = await this.user.findByEmail(email);
        return user;
    }

    async getAllUsers(): Promise<PrismaUser[]> {
        const users = await this.user.findAll();
        return users;
    }

    async updateUser(id: string, data: any): Promise<PrismaUser> {
        return await this.user.updateUser(id, data);
    }

    async deleteUser(id: string): Promise<PrismaUser> {
        return await this.user.deleteUser(id);
    }
}