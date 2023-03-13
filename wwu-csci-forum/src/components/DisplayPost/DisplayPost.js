import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Thread from '../Thread/Thread';
import './DisplayPost.css'

function DisplayPost() {
    let { postid } = useParams();
    const [post, setPost] = useState({});

    
    async function getPost() {
        const response = await fetch(`/api/getPostById?postID=${postid}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get post');
        }
        const data = await response.json();
        setPost(data);
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <div className="post-display">
                <Thread postDetails={post} key={post._id} width={700} height={500} />
            </div>
        </div>
        
    )
}

export default DisplayPost;