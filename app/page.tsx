import NavBar from "@/Components/Navbar";
import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb'

export default async function Home() {

  const session = await getServerSession(AuthOptions);

  const posts = await prismadb.post.findMany({});
  
  if(session && session.user){
    return (
      <div>
        <h1>Blogify</h1>
        <p>Welcome {session.user.name}</p>
        <div>
            Posts
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
            
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>n kj kj</h1>
    </div>

  );
}
