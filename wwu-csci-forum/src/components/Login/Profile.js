import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logout from "../../store/Slices/AuthSlice";
import Button from '../Button/Button';

const Profile = () => {
    
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        window.location.reload(false);
        dispatch(logout);
        localStorage.removeItem("user");
        navigate("/")
    }

    return (
        <div>
            <h1>{user?.username}'s</h1> 
            <h1>Profile</h1>
            <Button onClick={logoutHandler}> Logout</Button>
        </div>
    );
};

export default Profile;