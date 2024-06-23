import { User } from "@prisma/client";

export enum UserType {
    LANDLORD = 'LANDLORD',
    TENANT = 'TENANT',
    ADMIN = 'ADMIN',
}

export enum AuthStatus {
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    INCOMPLETE_CREDENTIALS,
    VALID_USER
}

export interface AuthResponse{
    status: AuthStatus
    message: string
    user?: User
}

export enum RegistrationStatus {
    USER_CREATION_SUCCESSFUL,
    USER_CREATION_FAILED
}

export interface RegistrationResponse{
    status: RegistrationStatus
    message: string
    user?: User
}


export interface UserRegistrationCredentials {
    email: string;
    username: string;
    password: string;
    type: UserType;
    firstname: string;
    lastname: string;
    gender: string;
    birthdate: Date;
}
