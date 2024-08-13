import { AuthOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverauth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the expected request body
interface PostBody {
  title: string;
  content: string;
  author: string;
}

export async function POST(req: NextApiRequest , res: NextApiResponse) {
  try {

    const session = await getSession({ req });

    if (!session || !session.user) {
      // User is not authenticated
      return NextResponse.json({ error: "You must be logged in to create a post" });
    }

    const body: PostBody = await req.body;

    // Destructure the body
    const { title, content, author } = body;

    // Create a new post in the database
    const post = await prismadb.post.create({
      data: {
        title,
        content,
      },
    });

    // Return a successful response
    return new Response(JSON.stringify(post), {
      status: 201, // Created
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    // Handle errors
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ error: "Failed to create post" }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(req: Request) {
  try{
    const posts = await prismadb.post.findMany({});

    return new Response(JSON.stringify(posts))
  }catch(e){
    console.log(e);
  }
}