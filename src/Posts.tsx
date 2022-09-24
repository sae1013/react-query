import { useState,useEffect } from "react";
import { useQuery,useQueryClient } from "react-query";
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

async function fetchPosts(currentPage:number):Promise<Post[]> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
    );
    return response.json();
}

export function Posts() {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState<Post|null>(null);
    const [maxPage,setMaxPage]= useState(10);
    const { data, isError, error, isLoading } = useQuery<Post[],Error>(["posts",currentPage], ()=> fetchPosts(currentPage as number),{});
    const queryClient = useQueryClient(); // 얘는 리렌더링되도 같은애다.
    useEffect(() => {
        console.log('rerender')
        if(currentPage < maxPage) {
            queryClient.prefetchQuery(['posts',currentPage+1],()=>fetchPosts(currentPage+1),{
            })
        }
    },[currentPage,queryClient])
    useEffect(() => {
        console.log('매회렌더링')
    })
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
                <button disabled = {currentPage < 2} onClick={() => {
                    setCurrentPage((prev)=>{
                        return prev-1

                    })
                }}>
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button onClick={()=>setMaxPage(maxPage+1)}>강제렌더</button>
                <button disabled={currentPage >= maxPage} onClick={() => {
                    setCurrentPage((prev)=> prev+1)
                }}>
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
