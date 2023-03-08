import React, {useEffect} from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/Slices/AuthSlice';
import AppLoader from '../../util/loaders/AppLoader'
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignUpPage';
import Home from '../Pages/Home';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ProfilePage from '../Pages/ProfilePage';
import Protected from '../../util/Protected';
import PageNotFound from "../Pages/PageNotFound"
import Post from "../Post/Post";
import Account from "../Account/Account";
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
      {!loaded && <AppLoader />}
      <div className="navbar">
        <Navigation/>
      </div>
      <div className="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/profile' element={
            <Protected>
              <ProfilePage />
            </Protected>
          }></Route>
          <Route path='/update' element={
            <Protected>
              <Account />
            </Protected>
          }></Route>
          <Route path='/post' element={
            <Protected>
              <Post />
            </Protected>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
