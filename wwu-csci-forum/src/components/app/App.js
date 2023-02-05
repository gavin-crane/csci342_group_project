import logo from './logo.svg';
import Post from '../post/post';
import Login from '../login/login';
import Signup from '../login/signup';
import Button from '../button/button';
import MainThread from '../thread/mainThread';
import './App.css';

function App() {
    return (
      <>
        <MainThread/>
        <Post/>
      </>
    );
}

export default App;
