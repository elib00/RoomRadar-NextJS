import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        const { email, username, password, firstname, lastname, gender } = body;

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
        // const newUser = 




    }catch(err){
        console.error(err);
    }
}