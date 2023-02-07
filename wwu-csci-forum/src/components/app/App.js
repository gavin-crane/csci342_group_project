import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignUpPage';
import Home from '../Pages/Home';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Profile from '../Pages/Profile';
import './App.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import Protected from '../Login/Protected';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(login(user?.username || ''))
    }
  }, [])
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/profile' element={
          <Protected>
            <Profile />
          </Protected>
        }></Route>
        {/*<MainThread postDetails={postDetails2}/>*/}
        {/* <Post/> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
