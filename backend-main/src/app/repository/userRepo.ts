import type { User } from "../../../generated/prisma/index.js";
import prisma from "../../config/postgres.js";
import { BaseRepository } from "./baseRepo.js";

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(prisma.user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    

    


    

}