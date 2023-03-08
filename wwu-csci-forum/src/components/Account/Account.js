import React from 'react';
import './Account.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    major: z.string(),
    gradYear: z.string(),
    favLang: z.string(),
    bio: z.string(),
})

function Account (){
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const handleCancelClick = () => {
        navigate("/profile", { replace: true });
    }

    const updateHandler = (data) => {
        console.log(data.data)
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
                navigate("/profile", { replace: true });
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        })
        .catch(err => { })
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(updateHandler)}>
                    <div className="userCard cardWidth">
                        <div className="profile-tab-nav border-right">
                            <div className="pp-4">
                                <div className="img-circle text-center mb-3">
                                    <AccountCircleIcon sx={{
                                        fontSize: "120px"
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="tab-content pp-4 p-md-5" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="account"
                                role="tabpanel"
                                aria-labelledby="account-tab"
                            >
                                <h3 className="myb-3 h3">Account Settings</h3>
                                <div className="cardRow">
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="form-cont"
                                                {...register("firstName")}
                                            />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Last Name</label>
                                            <input type="text" className="form-cont" {...register("lastName")}/>
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Username</label>
                                            <input type="text" className="form-cont" {...register("username")}/>
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Major</label>
                                            <input type="text" className="form-cont" {...register("major")} />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Graduation Year</label>
                                            <input type="text" className="form-cont" {...register("gradYear")}/>
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Favorite Language</label>
                                            <input type="text" className="form-cont" {...register("favLang")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="cardRow-md-12">
                                    <div className="form-gp">
                                        <label>Bio</label>
                                        <textarea className="form-cont" rows="4" type="text" {...register("bio")} ></textarea>
                                    </div>
                                </div>
                                <div className='cta-flex'>
                                    <button className="cta-b">Update</button>
                                    <button className="cta-c" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );

}

export default Account;