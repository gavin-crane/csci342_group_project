import React, { useState} from 'react';
import './Post.css'
import Button from '../Button/Button';


class Post extends React.Component{
  /*
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  */

  

  handleSubmit(event) {
    event.preventDefault();
    // // Add code here to send the post data to the server
    //console.log("Post submitted:", event.target.value, body);
    //setTitle();
    //setBody();
  }

  render (){
    const {post} = this.props;
    return (
      <div className = "Form">
          <div className = "InsideForm">
              <input className = "InputTitle" type="text" placeholder="Title" value={post.title} /*onChange={event => setTitle(event.target.value)}*/ />           
              <br />  
              <textarea className = "InputBody" value={post.body} placeholder="Text" /*onChange={event => setBody(event.target.value)}*/ />
              <br />
              <div className = "LeftButton">
                <Button onClick= {this.handleSubmit}>Back</Button>
              </div>
              <div className = "SaveButton">
                <Button onClick= {this.handleSubmit}>Submit</Button>
              </div>
              <div className = "SumbitButton">
                <Button onClick= {this.handleSubmit}>Save</Button>
              </div>
             
              {/* <Button onClick= {handleSubmit}>Submit</Button> */}
              {/* <button className = "Button" onClick= {handleSubmit}>Submit</button> */}
          </div>
      </div>
    );
  }
  }



export default Post;