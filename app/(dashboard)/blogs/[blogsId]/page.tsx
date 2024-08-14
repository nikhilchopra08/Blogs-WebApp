import prismadb from "@/lib/prismadb"
import { BlogForm } from "./components/blog-form";

const PostPage = async ({params} : {params : {blogsId : string}}) => {
    const page = await prismadb.post.findUnique({
        where : {
            id : params.blogsId
        }
    });

    return (
        <div>Post
            {/* <h2>{page?.title}</h2>
            <p>{page?.content}</p> */}
            <BlogForm initialData={page}/>
        </div>
    )
}

export default PostPage;