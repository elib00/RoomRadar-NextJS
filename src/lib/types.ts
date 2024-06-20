export enum UserType {
    LANDLORD = 'LANDLORD',
    TENANT = 'TENANT',
    ADMIN = 'ADMIN',
}

export interface UserRegistrationCredentials {
    email: string;
    username: string;
    password: string;
    type: UserType;
    firstname: string;
    lastname: string;
    gender: string;
}
