import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DisplayPost(props) {
    let { postid } = useParams();
    return (
        <h1>{postid}</h1>
    )
}

export default DisplayPost;