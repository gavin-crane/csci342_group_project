import React from "react";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>{user?.username}'s</h1> 
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;