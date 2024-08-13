import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {

  const session = await getServerSession(AuthOptions);
  
  if(session && session.user){
    return (
      <div>
        <h1>Blogify</h1>
        <p>Welcome {session.user.name}</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Not signed in</h1>
    </div>

  );
}
