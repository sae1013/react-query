
import {useQuery,useMutation} from 'react-query';
import {useEffect,useState,useRef} from "react";
interface Comment {
    email: string;
    name: string;
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

async function updatePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        // @ts-ignore
        { method: "PATCH" ,data: {title:'react'}}
    );
    return response.json();
}

export function PostDetail({ post }) {

    const query = useQuery<Comment[],Error>(['comments',post.id],() => fetchComments(post.id),{refetchOnWindowFocus:false})
    const {data,isLoading,error} = query
    const deleteMutation = useMutation<Comment,Error>((postId) => deletePost(postId))

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button onClick={()=>{deleteMutation.mutate(post.id)}}>Delete</button>
            <button onClick={()=>{deleteMutation.mutate(post.id)}}>UPDATE</button>
            {deleteMutation.isError && <p style={{color:'red'}}>Something wrong</p>}
            {deleteMutation.isLoading && <p style={{color:'yello'}}>Loading...</p>}
            {deleteMutation.isSuccess && <p style={{color:'green'}}>Successful deleted</p>}
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
