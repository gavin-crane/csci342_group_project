import React from 'react';
import LeftBar from '../LeftBar/LeftBar';
import ThreadList from '../ThreadList/ThreadList'
import './Home.css'
const post = {
  title: 'My first post',
  author: 'John Doe',
  content: 'This is my text body sda;kjfh asdkfj asdlkf gasdlkfjg hasdfkjalsd flkjadsfhasdjkfhasd hflaskjdh fhlasjdkf',
  replies: {}

};

const posts = [post, post, post, post, post, post];


export default function home() {
  return (
    <>
      <div className = "homeContent">
        <LeftBar/>
        <ThreadList threads={posts}/>
      </div>
    </>
  )
}

