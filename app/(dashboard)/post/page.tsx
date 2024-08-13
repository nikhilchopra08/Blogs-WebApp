"use client"

import Input from "@/Components/input"
import { useState, useCallback, useEffect } from "react"
import { useSession } from "next-auth/react";
import axios from "axios"

const Post = () => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthor] = useState('');

    // Update author state when session data changes
    useEffect(() => {
        if (session?.user?.name) {
            setAuthor(session.user.name);
        }
    }, [session]);

    const post = useCallback(async () => {
        if (!title || !content || !authorId) {
            console.log("Please fill in all fields.");
            return;
        }

        console.log("Posting with values:", { title, content, authorId });

        try {
            await axios.post('/api/post', {
                title,
                content,
            });
            // Handle successful post creation, e.g., reset fields or show a success message
            setTitle('');
            setContent('');
            console.log("Post created successfully.");
        } catch (e) {
            console.log("Error posting:", e);
        }
    }, [title, content, authorId]);
    
    // Handle loading and error states
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated" && !session.user) {
        return <div>Please log in to post.</div>;
    }

    return (
        <div>
            <h1>Hello</h1>
            <Input 
                label="Title"
                onChange={(e : any) => setTitle(e.target.value)}
                id="title"
                value={title}
            />
            <Input
                label="Content"
                onChange={(e : any) => setContent(e.target.value)}
                id="content"
                value={content}
            />
            <div className="text-white">{authorId}</div>
            <button onClick={post}>Post</button>
        </div>
    )
}

export default Post;
