// "use client"

import React from 'react';
import useCurrentUser from '@/hooks/useCurrentUser'; // Adjust the import path as needed
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import prismadb from "@/lib/prismadb"

const UserProfile = async () => {
    // const session = useSession();

    // const se2 = axios.get('/api/current');

//    console.log( session2.data.user.id);

const session = await getServerSession(AuthOptions);

if(!session?.user?.email){
    throw new Error("Not signned In");
}

const currentUser = await prismadb.user.findUnique({
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
