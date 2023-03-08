import React from 'react'
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/Slices/AuthSlice';

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
    <div className="nav-container">
      <nav>
        <ul>
          {user.username ? (
            <>
              <li><Link to="/"><button>Home</button></Link></li>
              <li><Link to="/profile"><button>Profile</button></Link></li>
              <li><Link to="/post"><button>Post</button></Link></li>     
              <li><button onClick={logoutHandler}>Logout</button></li>
              <li>
                <div className="dropdown">
                  <button className="dropbtn">CodeTest</button>                                
                      <div className="dropdown-content">
                        <Link to ="/coderun/JavaRunner">Java</Link>
                        <Link to="/coderun/CRunner">C</Link>
                      </div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/"><button>Home</button></Link></li>
              <li><Link to="/login"><button>Log In</button></Link></li>
              <li><Link to="/signup"><button>Sign up</button></Link></li>  
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;