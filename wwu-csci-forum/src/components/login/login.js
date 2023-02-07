import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from '../button/button';
import { login } from '../../store/Slices/AuthSlice';
import "./Credential.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("isAuth")) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Add code here to send user info to the server
        if(username !== "" && password !== "") {
            localStorage.setItem("user", JSON.stringify({username, password}))

            dispatch(login(username))
            navigate("/profile")
        }
        else {
            alert("Incorrect username and password");
        }
    }

    return (
        <div className="FormContainer">
            <form className="form">
                <label className="label">Username: </label>
                <input className="username-input" type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                {/* <br /> */}
                <label className="label">Password: </label>
                <input className="password-input" type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                {/* <br /> */}
                <Button onClick={handleSubmit}>Log In</Button>
            </form>
        </div>
    )
}

export default Login;