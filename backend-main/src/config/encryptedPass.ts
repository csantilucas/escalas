import bycrypt from "bcryptjs";

export class EncryptedPass {
    async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bycrypt.hash(password, saltRounds);
        return hashedPassword;
    }   

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bycrypt.compare(password, hashedPassword);
    }

}

