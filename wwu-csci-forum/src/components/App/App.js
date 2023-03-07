import React, {useEffect} from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/Slices/AuthSlice';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignUpPage';
import Home from '../Pages/Home';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ProfilePage from '../Login/Profile';
import Protected from '../../util/Protected';
import Post from "../Post/Post";
import './App.css';

const App = () => {
  const { loaded } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      const user = JSON.parse(localStorage.getItem('user'));
      setTimeout(() => {
        dispatch(login({
          username: user?.username || ''
        }))
      }, 2000)
    }
  })
  
  return (
    <div className="App">
      {!loaded}
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/profile' element={
          <Protected>
            <ProfilePage />
          </Protected>
        }></Route>
        <Route path='/post' element={<Post />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
