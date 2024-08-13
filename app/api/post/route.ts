import prismadb from "@/lib/prismadb";

// Define the type for the expected request body
interface PostBody {
  title: string;
  content: string;
  author: string;
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body: PostBody = await req.json();

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
