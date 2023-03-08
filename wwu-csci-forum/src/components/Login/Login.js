import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../../store/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "./Credential.css";

const formSchema = z.object({
    username: z.string(),
    password: z.string().min(6, "password must be at least 6 characters"),
})

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const loginHandler = data => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const { username = '' } = data.data.user;
                    dispatch(login({ username }));
                    localStorage.setItem('user', JSON.stringify({username: data.data.user.username, _id: data.data.user._id}));
                    navigate("/", { replace: true });
                    console.log(data.message);
                } else {
                    console.error(data.message);
                }
            })
            .catch(err => { })
    };

    return (
        <div className="FormContainer">
            <form className="form" onSubmit={handleSubmit(loginHandler)}>
                <label className="label">Username </label>
                <input className="input-field" type="text" {...register("username")} />
                <label className="label">Password </label>
                <input className="input-field" type="text" {...register("password")} />
                {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                <button className="submit-button" type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;