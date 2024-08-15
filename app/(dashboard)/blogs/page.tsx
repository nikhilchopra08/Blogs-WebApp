
import React from 'react';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/lib/auth';
import prismadb from "@/lib/prismadb"
import Link from 'next/link';

const UserProfile = async () => {
    // const session = useSession();

    // const se2 = axios.get('/api/current');

//    console.log( session2.data.user.id);

const session = await getServerSession(AuthOptions);

if(!session?.user?.email){
    throw new Error("Not signned In");
}

const currentUser = await prismadb.user.findFirst({
    where:{
        email : session.user.email
    }
});

console.log(currentUser?.id)

const posts = await prismadb.post.findMany({
    where:{
        authorId : currentUser?.id
    }
})

    return (
        <div>
            {session.user.name}
            {/* {se2} */}
            <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <Link  href={`/blogs/${post.id}`}>
                        <button 
                                // onClick={() => handleEdit(post.id)} 
                                // onClick={() => console.log("click hua")}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#0070f3',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Edit
                            </button>
                            </Link>
                    </div>
                    
                ))
            ) : (
                <div>No posts found</div>
            )}
        </div>
        </div>
    )
}

export default UserProfile;
