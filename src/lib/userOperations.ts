import { db } from "@/lib/db"
import { UserType, UserRegistrationCredentials } from "@/lib/types";

export const createUser = async (userCredentials: UserRegistrationCredentials) => {
    try{
        const newUser = await db.user.create({
            data: {
                email: userCredentials.email,
                username: userCredentials.username,
                password: userCredentials.password,
                type: UserType.TENANT,
                createdAt: new Date(),
                updatedAt: new Date(),
                
            }
        });
    }catch(err: any) {
        throw new Error(`Failed to create user: ${err.message}`);
    }
};