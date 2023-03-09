import React, { useState, useEffect} from 'react';
import './Post.css'
import Button from '../Button/Button';
import FilterTags from '../FilterTags/FilterTags';
import { useNavigate } from "react-router-dom";

// default searched filters
const loadedChips = [
  { key: 0, label: 'Python' },
  { key: 1, label: 'Project' },
  { key: 7, label: 'Research' },
  { key: 8, label: 'CS 247' },
]


// current filter bank, we can add as many as needed
const chipBank = [
  { key: 2, label: 'CS 241' },
  { key: 3, label: 'Internship' },
  { key: 4, label: 'Java' },
  { key: 5, label: 'CS 330' },
  { key: 6, label: 'CS 345' },
  { key: 0, label: 'Python' },
  { key: 1, label: 'Project' },
  { key: 7, label: 'Research' },
]



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
  // console.log("chip data loaded in Post", chipData)

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
        <h1 className='FormTitle'>Post!</h1>
          <div className = "InsideForm">
              <input className = "InputTitle" type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />           
              <br />  
              <textarea className = "InputBody" value={body} placeholder="Text" onChange={event => setBody(event.target.value)} />
              <br />
              <input className='EmbedLink' type="text" placeholder='https://replit.com/@user/repl-name' value={codeLink} onChange={event => setCode(event.target.value)} />
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
          <FilterTags className="post-filter-tags" loadedChips={loadedChips} chipBank={chipBank} onChipDataChange={handleChipDataChange}/>

      </div>
    </>
  );
}

export default Post;