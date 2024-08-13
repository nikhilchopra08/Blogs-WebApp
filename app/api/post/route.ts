import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverauth";
import { NextApiRequest } from "next";

export async function POST(req: NextRequest , reqq : NextApiRequest) {
  try {

    // const session = await getServerSession(req, AuthOptions);

    const currentUser = await serverAuth(reqq);

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Enter Title" }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ message: "Enter Content" }, { status: 400 });
    }

    const authorId = currentUser.currentUser.id;
    // if (!author) {
    //   return NextResponse.json({ message: "Enter Author" }, { status: 400 });
    // }

    const post = await prismadb.post.create({
      data: {
        title,
        content,
        authorId
      },
    });

    console.log(post);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req:NextRequest) {
  try{
    const posts = await prismadb.post.findMany();

    return NextResponse.json(posts);
  }
  catch(e){
    console.log(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}