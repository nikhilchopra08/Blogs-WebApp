import NavBar from "@/Components/Navbar";
import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb'
import PostComponent from "@/Components/Post";
import Button from "@/Components/button";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(AuthOptions);

  const posts = await prismadb.post.findMany({});

  if (session && session.user) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-[#d0f0c0] min-h-screen">
        <h1 className="text-3xl font-bold my-4 text-center">Pantry Tracker</h1>
        <p className="text-lg mb-8 text-center">
          Welcome, {session.user.name}! Your organized approach is helping manage your pantry efficiently!
        </p>

        <div className="flex flex-col gap-4">
          <PostComponent />
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Items</h2>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                  </div>
                  <Link href={`/blogs/${post.id}`}>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>n kj kj</h1>
    </div>
  );
}
