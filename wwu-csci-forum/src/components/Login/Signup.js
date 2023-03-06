import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/Slices/AuthSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    username: z.string().min(1, "Enter a username"),
    password: z.string().min(6, "password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "confirm password must be at least 6 characters"),
    }).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
        code: "custom",
        message: "Password not matched",
        path: ["confirmPassword"]
        })
    }
})

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const signupHandler = (data) => {
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const { username = '' } = data.data.user;
                console.log(data.data.user);
                dispatch(login({ username }));
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate("/", { replace: true });
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        })
        .catch(err => { })
    };

    return (
        <div className='FormContainer'>
            <form className="form" onSubmit={handleSubmit(signupHandler)}>
            <label className="label">Username: </label>
                <input className="username-input" type="text" {...register("username")} />
                <label className="label">Password: </label>
                <input className="password-input" type="text" {...register("password")} />
                {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                <label className="label">Confirm Password: </label>
                <input className="password-input" type="text" {...register("confirmPassword")} />
                {errors.password && <p className="text-danger">{errors.confirmPassword?.message}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;