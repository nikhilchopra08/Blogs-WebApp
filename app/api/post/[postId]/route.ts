import serverAuth from "@/lib/serverauth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";  // Import your Prisma client

export async function GET(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        // Get the current user (assuming serverAuth handles the user authentication)
        // const { currentUser } = await serverAuth(req);

        // Retrieve posts by the authorId from the params
        const posts = await prismadb.post.findMany({
            where: {
                id: params.postId,
            },
        });

        // Return the retrieved posts in the response
        return NextResponse.json(posts);
    } catch (e) {
        console.error(e);
        return new NextResponse("Error occurred while fetching posts", { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {

    try{
        const body = await req.json();

        const { title, content } = body;

        if (!title) {
            return new NextResponse("title is required");
        }

        if (!content) {
            return new NextResponse("content is required");
        }

        const posts = await prismadb.post.updateMany({
            where: {
                id: params.postId
            },
            data: {
                title,
                content
            }
        })

        return NextResponse.json(posts);
    }
    catch(e){
        console.log("some error");
        return new NextResponse("Check the post/post.id/route.ts");
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { postId: string } }
) {
    try{
        const post = await prismadb.post.deleteMany({
            where :{
                id : params.postId
            }
        })

        return NextResponse.json(post);
    }
    catch(e){
        console.log("error deleteing")
        return new NextResponse("unable to delete");
    }
}