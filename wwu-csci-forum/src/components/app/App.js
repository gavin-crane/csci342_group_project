import logo from './logo.svg';
import Post from '../post/post';
import Login from '../login/login';
import Signup from '../login/signup';
import Button from '../button/button';
import MainThread from '../thread/mainThread';
import './App.css';


let postDetails2 = {
  title: 'My first post',
  author: 'John Doe',
  content: 'This is my text body sda;kjfh asdkfj asdlkf gasdlkfjg hasdfkjalsd flkjadsfhasdjkfhasd hflaskjdh fhlasjdkf',
  replies: {}

}

function App() {
    return (
      <>
        <MainThread postDetails={postDetails2}/>
        {/* <Post/> */}
      </>
    );
}

export default App;
