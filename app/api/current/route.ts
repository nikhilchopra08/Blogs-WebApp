import serverAuth from "@/lib/serverauth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req : NextApiRequest , res : NextApiResponse) {
    // return NextResponse.json("Hello");
    if(req.method != 'GET'){
        return res.json("not the correct route");
    }

    try{
        const currentUser = await serverAuth(req);

        return res.json({currentUser});
    }catch(e){
        console.log(e);
        return res.json("Check the api/current/route.ts");
    }
}