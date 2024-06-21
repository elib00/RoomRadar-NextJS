import { db } from "@/lib/db"
import { UserType, UserRegistrationCredentials } from "@/lib/types";
import { User } from "@prisma/client"; 

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
                profile: {
                    create: {
                        firstname: userCredentials.firstname,
                        lastname: userCredentials.lastname,
                        gender: userCredentials.gender,
                        birthdate: userCredentials.birthdate
                    }
                },
                account: {
                    create: {
                        boardingHouses: { create: [] }, 
                        listings: { create: [] } 
                    }
                }
            },
            include: {
                profile: true,
                account: true
            }
        });

        return newUser;
    }catch(err: any) {
        throw new Error(`Failed to create user: ${err.message}`);
    }
};