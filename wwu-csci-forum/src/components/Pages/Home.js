import React, {useEffect, useState} from 'react';
import LeftBar from '../LeftBar/LeftBar';
import ThreadList from '../ThreadList/ThreadList'
import './Home.css'

// const post = {
//   title: 'My first post',
//   // author: 'John Doe',
//   content: 'This is my text body sda;kjfh asdkfj asdlkf gasdlkfjg hasdfkjalsd flkjadsfhasdjkfhasd hflaskjdh fhlasjdkf',
// // 

// };

// const posts = [post, post, post, post, post, post];


export default function Home() {
  const [posts, setPosts] = useState([]);
  console.log("post data from the front end");
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/getPosts');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <div className = "homeContent">
        <LeftBar/>
        <ThreadList threads={posts}/>
      </div>
    </>
  )
}

