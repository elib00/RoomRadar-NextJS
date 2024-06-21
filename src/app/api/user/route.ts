import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { verifyPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try{
        const body = await req.json();
        const { email, password } = body;

        if(!email.trim() || !password.trim()){
            return NextResponse.json({ 
                success: false, 
                message: "Email and password are required." 
            }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email }
        });

        if(!user){
            return NextResponse.json({ 
                success: false, 
                message: "Account with the given email does not exist." 
            }, { status: 404 });
        }

        const isPasswordMatch = await verifyPassword(password, user.password);

        if(!isPasswordMatch){
            return NextResponse.json({ 
                success: false, 
                message: "Incorrect password. Please try again."
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            message: "Login successful.",
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
            },
        });

    }catch(err: any){
        console.error(err);
        return NextResponse.json({
            success: false,
            message: `Failed to validate user: ${err.message}`
        }, { status: 500 });
    }
};