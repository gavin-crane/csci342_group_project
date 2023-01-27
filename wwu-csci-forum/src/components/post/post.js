import React, { useState} from 'react';
import './post.css'


function Post() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();


  console.log("this is the post functional component!")

  function handleSubmit(event) {
    //event.preventDefault();
    // Add code here to send the post data to the server
    console.log("Post submitted:", title, body);
    setTitle();
    setBody();
  }

  return (
    <div className = "Form">
        <div className = "InsideForm">
            <input className = "InputTitle" type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />           
            <br />  
            <textarea className = "InputBody" value={body} placeholder="Text" onChange={event => setBody(event.target.value)} />
            <br />
            <button className = "Button" onClick= {handleSubmit}>Submit</button>
        </div>
    </div>
  );
}

export default Post;