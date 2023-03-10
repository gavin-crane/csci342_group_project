import React from 'react';
import './AccountUpdate.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({

    firstName: z.string(),
    lastName: z.string(),
    major: z.string(),
    gradYear: z.string(),
    favLang: z.string(),
    bio: z.string(),
})

function Account (){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const handleCancelClick = () => {
        navigate("/profile", { replace: true });
    }

    const updateHandler = (data) => {
        console.log(user.username)
        data.username = user.username;
        console.log(JSON.stringify(data))
        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                navigate("/profile", { user: JSON.parse(localStorage.getItem('user')), replace: true });
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        })
        .catch(err => { })
    };

    return (
        <>
                <form onSubmit={handleSubmit(updateHandler)}>
                    <div className="UserCard CardWidth">
                        <div className="Profile-tab-nav Border-right">
                            <div className="pp-4">
                                <div className="img-circle text-center mb-3">
                                    <AccountCircleIcon sx={{
                                        fontSize: "120px"
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="Tab-content pp-4 p-md-5" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="account"
                                role="tabpanel"
                                aria-labelledby="account-tab"
                            >
                                <h3 className="Myb-3 h3">Account Settings</h3>
                                <div className="CardRow">
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="Form-cont"
                                                {...register("firstName")}
                                            />
                                        </div>
                                    </div>
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>Last Name</label>
                                            <input type="text" className="Form-cont" {...register("lastName")}/>
                                        </div>
                                    </div>
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>Username</label>
                                            <label className="Form-cont">{user.username}</label>
                                        </div>
                                    </div>
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>Major</label>
                                            <input type="text" className="Form-cont" {...register("major")} />
                                        </div>
                                    </div>
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>Graduation Year</label>
                                            <input type="text" className="Form-cont" {...register("gradYear")}/>
                                        </div>
                                    </div>
                                    <div className="CardRow-md">
                                        <div className="Form-gp">
                                            <label>Favorite Language</label>
                                            <input type="text" className="Form-cont" {...register("favLang")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="CardRow-md-12">
                                    <div className="Form-gp">
                                        <label>Bio</label>
                                        <textarea className="Form-cont" rows="4" type="text" {...register("bio")} ></textarea>
                                    </div>
                                </div>
                                <div className='cta-flex'>
                                    <button className="Cta-b">Update</button>
                                    <button className="Cta-b" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </>
    );

}

export default Account;