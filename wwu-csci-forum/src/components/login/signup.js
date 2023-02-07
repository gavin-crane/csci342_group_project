import React, { useState } from 'react';
import Button from '../Button/Button';

const Signup = () => {
    const [state, setState] = useState({username: '', password: '', passwordConfirm: ''});

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { username, password, passwordConfirm } = state;
        // Add code here to send user info to the server
        alert(`username: ${username} password: ${password} confirmed password: ${passwordConfirm}`);
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