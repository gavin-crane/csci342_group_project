import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThreadList from "../ThreadList/ThreadList";
import './Account.css';

function DisplayAccount(user) {

    const navigate = useNavigate();
    let { username } = useParams();

    const [posts, setPosts] = useState( [] );
    const [userInfo, setUserInfo] = useState({
        username: '', 
        firstName: '', 
        lastName: '',
        major: '', 
        gradYear: '', 
        favLang: '', 
        bio: ''
    });

    var isUser = false

    if (!username){
        username = JSON.parse(localStorage.getItem('user')).username;
        isUser = true
    }

    const handleUpdateProfileClick = () => {
        navigate("/update", { replace: true });
    }

    useEffect(() => {

        async function fetchUser() {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username : username})
            });
            const data = await response.json();
            setUserInfo(data.data.user);
        }



        async function fetchPosts() {
            const response = await fetch('/api/getUserPosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username})
            });
            const posts = await response.json();
            setPosts(posts);
        }

        fetchUser()
        fetchPosts()

    }, [username])

    return (
        <div className="wrapper">
            <div className="container">
                <div className="userCard cardWidth">
                    <div className="profile-tab-nav border-right">
                        <div className="pp-4">
                            <div className="img-circle text-center mb-3">
                                <AccountCircleIcon sx={{
                                    fontSize: "120px"
                                }} />
                            </div>
                            { <h4>{userInfo.username}</h4> }
                        </div>
                    </div>
                    <div className="tab-content pp-4 p-md-5" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                            <div className="cardRow">
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Name</label>
                                        <label type="text" className="form-cont" >{userInfo.firstName} {userInfo.lastName}</label>
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
                                { isUser
                                    ? <button className="cta-b" onClick={handleUpdateProfileClick}>Update</button>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "posts">
                <h1>{userInfo.username}'s Posts</h1>
                <ThreadList threads={posts}/>
            </div>
        </div>
    )
}

export default DisplayAccount;