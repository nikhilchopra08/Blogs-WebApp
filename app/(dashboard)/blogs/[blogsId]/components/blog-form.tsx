"use client";

import * as z from 'zod';
import { Post } from "@prisma/client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import Input from '@/Components/input';
import Button from '@/Components/button';

interface BlogProps {
    initialData: Post | null;
}

const formSchema = z.object({
    title: z.string().min(1, "Title is missing"),
    content: z.string().min(1, "Content is missing"),
});

type BlogFormValues = z.infer<typeof formSchema>;

export const BlogForm: React.FC<BlogProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: '',
            content: ''
        }
    });

    const onSubmit = async (data: BlogFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/post/${params.blogsId}`, data);
            } else {
                await axios.post('/api/post', data);
            }
            router.refresh();
            alert("Success!");
            router.push('/blogs');

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/post/${params.blogsId}`);
            router.refresh();
            router.push('/blogs');
            alert("Success!");
        }catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <FormProvider {...form}>
            <div>
                {initialData?.content}
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        {initialData && (
                            <Button disabled={loading} onClick={onDelete}>
                                Delete
                            </Button>
                        )}
                        <Button disabled={loading} type="submit">
                            {initialData ? 'Update' : 'Create'}
                        </Button>
                    </div>


                </form>
            </div>
        </FormProvider>
    );
};
