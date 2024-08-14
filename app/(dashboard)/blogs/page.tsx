import prismadb from '@/lib/prismadb'

const Post = async () => {

    const posts = await prismadb.post.findMany({});

    return (
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
    )
}

export default Post;