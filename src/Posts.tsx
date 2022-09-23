import { useState } from "react";
import { useQuery } from "react-query";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

interface Post {
    userId:number;
    id:number;
    title:string;
    body:string;
}

interface Error {
    message:string;
}

async function fetchPosts():Promise<Post[]> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
    );
    return response.json();
}

export function Posts() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState<Post|null>(null);

    const { data, isError, error, isLoading } = useQuery<Post[],Error>("posts", fetchPosts);

    if (isLoading) return <h3>Loading...</h3>;
    if (isError)
        return (
            <>
                <h3>Oops, something went wrong</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <>
            <ul>
                {data && data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled onClick={() => {}}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button disabled onClick={() => {}}>
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
