import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { createUser } from "@/lib/userOperations";
import { UserType, UserRegistrationCredentials } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try{
        const body = await req.json();
        const { email, username, password, firstname, lastname, gender, birthdate } = body;
        console.log(birthdate);

        const isExistingUserByEmail = await db.user.findUnique({
            where: { email: email } 
        });

        if(isExistingUserByEmail) {
            return NextResponse.json({
                success: false,
                data: { user: null },
                message: "User with this email already exists"
            }, {status: 409});
        }

        const hashedPassword = await hashPassword(password);

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
        
        const newUser = await createUser(userCredentials);
        console.log(newUser);

        return NextResponse.json({
            success: true,
            user: newUser,
            message: "User created successfully"
        }, { status: 201 });
    }catch(err: any){
        console.error(err);
        return NextResponse.json({
            success: false,
            message: `Failed to create user: ${err.message}`
        }, { status: 500 });
    }
}