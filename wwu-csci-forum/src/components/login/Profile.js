import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logout from "../store/Slices/AuthSlice";

const Profile = () => {
    
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout);

        localStorage.removeItem("user");
        navigate("/")
    }

    return (
        <div className="container">
            <strong>{user?.username}</strong> Profile
            <button onClick={logoutHandler} className="btn btn-secondary"><mdOutlineLogout/> Logout</button>
        </div>
    );
};

export default Profile;