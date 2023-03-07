import React, { useState } from 'react';
import './Account.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const updateHandler = (data) => {
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
            const { 
                email = '', 
                firstName = '', 
                lastName = '',
                password = '',
                major = '', 
                gradYear = '', 
                favLang = '', 
                bio = ''
            } = data.data.user;
            console.log(data.data.user);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            navigate("/", { replace: true });
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(err => { })
};

const Account = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [major, setMajor] = useState(user?.major);
    const [gradYear, setGradYear] = useState(user?.gradYear);
    const [favLang, setFavLang] = useState(user?.favLang);
    const [bio, setBio] = useState(user?.bio);
    return (
        <>
            <div className="container">
                <form onSubmit={updateHandler(signupHandler)}>
                    <div className="userCard cardWidth">
                        <div className="profile-tab-nav border-right">
                            <div className="pp-4">
                                <div className="img-circle text-center mb-3">
                                    <AccountCircleIcon sx={{
                                        fontSize: "120px"
                                    }} />
                                </div>
                                <h4 className="text-center">{firstName} {lastName}</h4>
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
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Last Name</label>
                                            <input type="text" className="form-cont" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Email</label>
                                            <input type="text" className="form-cont" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Major</label>
                                            <input type="text" className="form-cont" value={major} onChange={(e) => setMajor(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Graduation Year</label>
                                            <input type="text" className="form-cont" value={gradYear} onChange={(e) => setGradYear(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="cardRow-md">
                                        <div className="form-gp">
                                            <label>Favorite Language</label>
                                            <input type="text" className="form-cont" value={favLang} onChange={(e) => setFavLang(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="cardRow-md-12">
                                    <div className="form-gp">
                                        <label>Bio</label>
                                        <textarea className="form-cont" rows="4" value={bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                                    </div>
                                </div>
                                <div className='cta-flex'>
                                    <button className="cta-b">Update</button>
                                    <button className="cta-c">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Account;