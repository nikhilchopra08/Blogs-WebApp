"use client";

import Input from "@/Components/input";
import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostComponent = () => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const router = useRouter();

    // Update author state when session data changes
    useEffect(() => {
        if (session?.user?.name) {
            setAuthorId(session.user.name);
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
                authorId,
            });
            // Handle successful post creation, e.g., reset fields or show a success message
            setTitle('');
            setContent('');
            console.log("Item added successfully.");
            router.refresh();
            router
        } catch (e) {
            console.log("Error adding item:", e);
        }
    }, [title, content, authorId]);

    // Handle loading and error states
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "authenticated" && !session.user) {
        return <div>Please log in to add items.</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Add a New Pantry Item</h1>
            <div className="flex flex-col gap-4">
                <Input 
                    label="Item Name"
                    onChange={(e: any) => setTitle(e.target.value)}
                    id="title"
                    value={title}
                />
                <Input
                    label="Description"
                    onChange={(e: any) => setContent(e.target.value)}
                    id="content"
                    value={content}
                />
                <button 
                    onClick={post} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default PostComponent;
