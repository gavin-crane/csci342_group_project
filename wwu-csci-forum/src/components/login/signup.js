import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/Slices/AuthSlice";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("isAuth")) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleSubmit = event => {
        event.preventDefault();
        // Add code here to send user info to the server
        if (!username) {
            return alert("Username is required");
        }
        if (!password) {
            return alert("Password is required");
        }
        if (!passwordConfirm) {
            return alert("Password is required");
        }
        if (password !== passwordConfirm) {
            return alert("Passwords do not match");
        }
        localStorage.setItem("user", JSON.stringify({username, password, passwordConfirm}))
        dispatch(login(username));
        navigate("/");
    }

    return (
        <form className="form">
            <label className="label">
                Username:
                <input className="username-input" type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label className="label">
                Password:
                <input className="password-input" type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label className="label">
                Confirm Password:
                <input className="password-input" type="text" name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
            </label>
            <br />
            <Button onClick={handleSubmit}>Sign Up</Button>
        </form>
    )
}

export default Signup;