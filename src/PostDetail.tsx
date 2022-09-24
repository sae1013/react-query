
import {useQuery} from 'react-query';
import {useEffect,useState,useRef} from "react";
interface Comment {
    email: string;
    name: string
    id: number;
    body: string;
    postId: number;
}

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "DELETE" }
    );
    return response.json();
}

export function PostDetail({ post }) {

    const query = useQuery<Comment[],Error>(['comments',post.id],() => fetchComments(post.id),{refetchOnWindowFocus:false})
    const {data,isLoading,error} = query

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button>Delete</button>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data && data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
