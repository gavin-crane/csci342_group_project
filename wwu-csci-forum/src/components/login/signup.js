import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/Slices/AuthSlice";

const Signup = () => {
    const [state, setState] = useState({username: '', password: '', passwordConfirm: ''});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("isAuth")) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { username, password, passwordConfirm } = state;
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
                <input className="username-input" type="text" name="username" value={state.username} onChange={handleChange} />
            </label>
            <br />
            <label className="label">
                Password:
                <input className="password-input" type="text" name="password" value={state.password} onChange={handleChange} />
            </label>
            <br />
            <label className="label">
                Confirm Password:
                <input className="password-input" type="text" name="passwordConfirm" value={state.passwordConfirm} onChange={handleChange} />
            </label>
            <br />
            <Button onClick={handleSubmit}>Sign Up</Button>
        </form>
    )
}

export default Signup;