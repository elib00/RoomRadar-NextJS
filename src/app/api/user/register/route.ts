import { registerUser } from "@/lib/userOperations";
import { RegistrationStatus } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try{
        const body = await req.json();
        const { email, username, password, firstname, lastname, gender, birthdate } = body;

        const result = await registerUser(email, username, password, firstname, lastname, gender, birthdate);
        const response = {
            success: result?.status == RegistrationStatus.USER_CREATION_SUCCESSFUL,
            message: result?.message,
            user: result?.user,
        }

        let code;
        switch(result?.status){
            case RegistrationStatus.USER_CREATION_SUCCESSFUL:
                code = 201; // resource created
                break;
            case RegistrationStatus.USER_CREATION_FAILED:
                code = 409; // resource already taken
        }

        return NextResponse.json(response, { status: code });
    }catch(err: any){
        console.error(err);
        return NextResponse.json({
            success: false,
            message: `Failed to create user: ${err.message}`
        }, { status: 500 });
    }
};