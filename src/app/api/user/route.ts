import { validateUser } from "@/lib/userOperations";
import { AuthStatus } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try{
        const body = await req.json();
        const { email, password } = body;

        const result = await validateUser(email, password);

        const response = {
            success: result?.status == AuthStatus.VALID_USER,
            message: result?.message,
            user: result?.user
        }

        let code;
        switch(result?.status){
            case AuthStatus.INCOMPLETE_CREDENTIALS:
                code = 400; // bad request (missing credentials)
                break;
            case AuthStatus.INVALID_PASSWORD:
                code = 401 // unauthorized
                break;
            case AuthStatus.USER_NOT_FOUND:
                code = 404 // not found
                break;
            case AuthStatus.VALID_USER:
                code = 200 // OK
        }

        return NextResponse.json(response, { status: code });

    }catch(err: any){
        console.error(err);
        return NextResponse.json({
            success: false,
            message: `Failed to validate user: ${err.message}`
        }, { status: 500 });
    }
};