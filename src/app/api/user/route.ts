import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    return NextResponse.json({success: true})
};

// export const POST = async (req: NextRequest) => {
//     try{
//         const body = await req.json();
//         const 
//     }
// }