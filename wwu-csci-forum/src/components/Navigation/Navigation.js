import React from 'react'
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/Slices/AuthSlice';
import logo from './R.jpeg';

function Navigation() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav>
        {user.username ? (
          <div className="nav-bar">
            <img src = {logo} alt="logo" />
            <ul className="left-nav">
              <li><Link to="/"><button>CS Forum</button></Link></li>
              <li><Link to="/post"><button>Post</button></Link></li>  
              <li>
                <div className="dropdown">
                  <button className="dropbtn">CodeTest</button>                                
                      <div className="dropdown-content">
                        <Link to ="/coderun/JavaRunner">Java</Link>
                        <Link to="/coderun/CRunner">C</Link>
                      </div>
                </div>
              </li>
            </ul>   
            <ul className="right-nav">
              <li><Link to="/profile"><button>Profile</button></Link></li>
              <li><button onClick={logoutHandler}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="nav-bar">
            <img src = {logo} alt="logo" />
            <ul className="left-nav"></ul>
            <ul className="left-nav">
              <li><Link to="/"><button>CS Forum</button></Link></li>
            </ul>
            <ul className="right-nav">
              <li><Link to="/login"><button>Log In</button></Link></li>
              <li><Link to="/signup"><button>Sign up</button></Link></li>  
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;