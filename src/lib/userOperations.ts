import { db } from "@/lib/db"
import { 
    UserType, 
    UserRegistrationCredentials, 
    AuthStatus, 
    AuthResponse, 
    RegistrationResponse, 
    RegistrationStatus } from "@/lib/types";
import { verifyPassword } from "./utils"; 
import { hashPassword } from "./utils";

const createUser = async (userCredentials: UserRegistrationCredentials) => {
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

export const registerUser = async (email: string, username: string, password: string, firstname: string, lastname: string, gender: string, birthdate: Date): Promise<RegistrationResponse | undefined> => {
    const isExistingUserByEmail = await db.user.findUnique({
        where: { email: email } 
    });

    let response: RegistrationResponse = {
        status: RegistrationStatus.USER_CREATION_SUCCESSFUL,
        message: "User registration successfull"
    }

    if(isExistingUserByEmail) {
        response = {
            status: RegistrationStatus.USER_CREATION_FAILED,
            message: "A user with this email already exists"
        }

        return response;
    }

    let hashedPassword = "";

    try{
        hashedPassword = await hashPassword(password);
    }catch(err: any){
        throw new Error(err.message);
    }

    const userCredentials: UserRegistrationCredentials = {
        email: email,
        username: username,
        password: hashedPassword,
        type: UserType.TENANT,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        birthdate: birthdate
    };

    try{
        const newUser = await createUser(userCredentials);
        response.user = newUser;
        return response;
    }catch(err: any){
        throw new Error(err.message);
    }
};




export const validateUser = async (email: string, password: string): Promise<AuthResponse | undefined> => {
    let response: AuthResponse = {
        status: AuthStatus.VALID_USER,
        message: "User found"
    }

    if(!email.trim() || !password.trim()){
        response =  {
            status: AuthStatus.INCOMPLETE_CREDENTIALS, 
            message: "Email and password must not be empty",
        }

        return response;
    }

    const user = await db.user.findUnique({
        where: { email }
    });

    if(!user){
        response = {
            status: AuthStatus.USER_NOT_FOUND,
            message: "User not found"
        }

        return response;
    }

    try{
        const isPasswordMatch = await verifyPassword(password, user.password);
        if(!isPasswordMatch){
            response = {
                status: AuthStatus.INVALID_PASSWORD,
                message: "Password is incorrect"
            }
    
            return response;
        }
    }catch(err: any){
        throw new Error(err.message);
    }

    
    response.user = user;
    return response;
}
