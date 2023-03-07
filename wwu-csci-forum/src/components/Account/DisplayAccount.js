import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DisplayAccount = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const [userInfo, setUserInfo] = useState({
        username: '', 
        firstName: '', 
        lastName: '',
        major: '', 
        gradYear: '', 
        favLang: '', 
        bio: ''
      });

    const handleUpdateProfileClick = () => {
        navigate("/update", { replace: true });
    }

    useEffect(() => {
    fetch('/api/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            setUserInfo(data.data.user);
            console.log(data.data.user);
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(err => { })
    }, [])
    
    

    return (
        <>
            <div className="container">
                <div className="userCard cardWidth">
                    <div className="profile-tab-nav border-right">
                        <div className="pp-4">
                            <div className="img-circle text-center mb-3">
                                <AccountCircleIcon sx={{
                                    fontSize: "120px"
                                }} />
                            </div>
                            { <h4 className="text-center">{userInfo.firstName} {userInfo.lastName}</h4> }
                        </div>
                    </div>
                    <div className="tab-content pp-4 p-md-5" id="v-pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="account"
                            role="tabpanel"
                            aria-labelledby="account-tab"
                        >
                            <h3 className="myb-3 h3">Account Info</h3>
                            <div className="cardRow">
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>First Name</label>
                                        <label type="text" className="form-cont" >{userInfo.firstName}</label>
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Last Name</label>
                                        <label type="text" className="form-cont" >{userInfo.lastName}</label>
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Username</label>
                                        <label type="text" className="form-cont" >{userInfo.username}</label>
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Major</label>
                                        <label type="text" className="form-cont" >{userInfo.major}</label>
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Graduation Year</label>
                                        <label type="text" className="form-cont" >{userInfo.gradYear}</label>
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Favorite Language</label>
                                        <label type="text" className="form-cont" >{userInfo.favLang}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="cardRow-md-12">
                                <div className="form-gp">
                                    <label>Bio</label>
                                    <label className="form-cont" rows="4" type="text">{userInfo.bio}</label>
                                </div>
                            </div>
                            <div className='cta-flex'>
                                <button className="cta-b" onClick={handleUpdateProfileClick}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayAccount;