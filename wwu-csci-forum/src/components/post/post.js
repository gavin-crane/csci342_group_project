import React, { useState} from 'react';
import './Post.css'
import Button from '../Button/Button';


function Post() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  function handleSubmit(event) {
    event.preventDefault();
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
            <div className = "LeftButton">
              <Button onClick= {handleSubmit}>Back</Button>
            </div>
            <div className = "SaveButton">
              <Button onClick= {handleSubmit}>Submit</Button>
            </div>
            <div className = "SumbitButton">
              <Button onClick= {handleSubmit}>Save</Button>
            </div>
           
            {/* <Button onClick= {handleSubmit}>Submit</Button> */}
            {/* <button className = "Button" onClick= {handleSubmit}>Submit</button> */}
        </div>
    </div>
  );
}

export default Post;