import React, { useState, useEffect} from 'react';
import './Post.css'
import Button from '../Button/Button';
import {loadedChips, chipBank} from '../../util/chips/chips.js';
import FilterTags from '../FilterTags/FilterTags';
import { useNavigate } from "react-router-dom";

// const replies = [];
function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [codeLink, setCode] = useState();
  // console.log("userId", userId);

  //currently selected chip data
  const [chipData, setChipData] = useState([]);
  const handleChipDataChange = (newChipData) => {
    setChipData(newChipData);
  };
  console.log("chip data loaded in Post", chipData)

  const handleSubmit = async (event)  => {
    event.preventDefault();
    console.log("all post details:", userId, title, body, chipData)
    const response = await fetch('/api/submitPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userName,
        title,
        body,
        chipData,
        codeLink,
        replies: [],
      }),
    });

    const data = await response.json();
    console.log(data);
    // Add code here to send the post data to the server
    // console.log("Post submitted:", title, body);
    setTitle();
    setBody();
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserId(userData._id);
    setUserName(userData.username);
  }, []);

  return (
    <>
      <div className = "Form">
        
          <form className = "InsideForm">
              <h1 className='FormTitle'>Make a Post!</h1>
              <input className = "InputTitle" type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />           
              <textarea className = "InputBody" value={body} placeholder="Text" onChange={event => setBody(event.target.value)} />
              <input className='EmbedLink' type="text" placeholder='https://replit.com/@user/repl-name' value={codeLink} onChange={event => setCode(event.target.value)} />
              <button className = "SubmitButton" onClick= {handleSubmit}>Submit</button>
              {/* <Button onClick= {handleSubmit}>Submit</Button> */}
              {/* <button className = "Button" onClick= {handleSubmit}>Submit</button> */}
          </form>
          <FilterTags className="post-filter-tags" loadedChips={loadedChips} chipBank={chipBank} onChipDataChange={handleChipDataChange}/>

      </div>
    </>
  );
}

export default Post;