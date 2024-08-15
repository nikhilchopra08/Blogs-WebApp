import serverAuth from "@/lib/serverauth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        return NextResponse.json({message :  "id" });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Check the api/current/route.ts" });
    }
}