import React, { useState } from 'react';
import Button from '../button/button';

const Login = () => {
    const [state, setState] = useState({username: '', password: ''});

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { username, password } = state;
        // Add code here to send user info to the server
        alert(`username: ${username} password: ${password}`);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" name="username" value={state.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="text" name="password" value={state.password} onChange={handleChange} />
            </label>
            <br />
            <Button onClick={handleSubmit}>Log In</Button>
        </form>
    )
}

export default Login