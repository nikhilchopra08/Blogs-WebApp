import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try{
        return NextResponse.json("Hello");
    }
    catch(e){
        console.log(e);
    }
}