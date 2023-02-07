import React from 'react'
import './Navigation.css';
import {Link} from 'react-router-dom';

export default function Navigation() {
  return (
    <div>
        <nav>
            <ul>
              <li><Link to="/login"><button>Log In</button></Link></li>
              <li><Link to="/signup"><button>Sign up</button></Link></li>
              <li><Link to="/profile"><button>Profile</button></Link></li>
              <li><Link to="/post"><button>Post!</button></Link></li>            
            </ul>
        </nav>
    </div>
  )
}