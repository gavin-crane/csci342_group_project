import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import './Thread.css'

const ReplyForm = ({ onSubmit }) => {
    const [replyContent, setReplyContent] = useState('')

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                onSubmit(replyContent)
                setReplyContent('')
            }}
        >
            <TextField
                label='Reply Content'
                value={replyContent}
                onChange={event => setReplyContent(event.target.value)}
            />
            <Button type='submit'>Submit</Button>
        </form>
    )
}

export default function MainThread({postDetails: { title, userName, body, chipData, userId, _id, codeLink}, width, height}) {

    const [replies, setReplies] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const navigate = useNavigate();

    let userIDLocal = "";
    let userNameLocal = "";
    if(localStorage.getItem("user")){
       userIDLocal = JSON.parse(localStorage.getItem('user'))._id;
       userNameLocal = JSON.parse(localStorage.getItem('user')).username;
    }

    async function getReplies() {
        let postID = _id;
        const response = await fetch(`/api/getReplies?postID=${postID}`);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to get replies');
        }
        const data = await response.json();
        setReplies(data.reverse());
      }

    

    // this function needs to be cleaned up badly, its literally redundant
    const addReply = (_id, userIDLocal, replyAuthor, replyContent) => {
        // console.log("reply data being passed:",replyAuthor, replyContent);
        async function submitReply(_id, userIDLocal, replyAuthor, replyContent) {
            console.log("async submit reply:",_id, userIDLocal, replyAuthor, replyContent)
            const response = await fetch('/api/submitReply', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ postID:_id, userID:userIDLocal, author:replyAuthor, content:replyContent })
            });
            const data = await response.json();
            if (response.ok) {
              console.log("reply added");
              getReplies();
            } else {
              throw new Error(data.message);
            }
        }
        setShowReplyForm(false);
        submitReply(_id, userIDLocal, replyAuthor, replyContent);    
    }

    if(codeLink){
        codeLink = codeLink + "?embed=true";
    }
    // console.log(codeLink)

    const gotoProfile = () => {
        navigate(`/profile/${userName}`, { replace: true });
    }

    const gotoPost = () => {
        navigate(`/post/${_id}`, { replace: false });
    }

    useEffect(() => {
        getReplies();
    }, []);

    return (
        <Card   sx={{ width: width, 
                    height: height, 
                    marginTop: 2, 
                    textAlign: 'left',    
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    backgroundColor: '#46494d',
                    color: '#fff',
                    borderRadius: 2.5,
                    marginLeft: '20px'}}>
            <CardContent sx={{ overflow: 'auto', height: '100%' }}>
                {!showReplies && (<div>
                    <div className="thread-tags-container">
                        {chipData?.map(item => <Chip key={item.key} label={item.label} sx={{marginRight: '4px', marginTop: '4px', backgroundColor: '#cfcfcf' }}/>)}
                    </div>      
                    <Typography gutterBottom variant='h5' component='div' sx={{marginTop: '10px' }}>
                        <button className="post-button" onClick={gotoPost}>{title}</button>
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: '#ffffff', fontWeight:'bold' }} variant='subtitle1' color='text.secondary'>
                        By: <button className="profile-button" onClick={gotoProfile}> {userName} </button>
                    </Typography>
                    <Typography sx={{ color: '#e0e0e0' }} variant='body2' color='text.secondary'>
                        {body}
                    </Typography>
                    {codeLink && (
                    <iframe src={codeLink} title="Repl embedded code"/>)}
                </div>)}
                    {showReplies && (
                    <div>
                    <Typography gutterBottom variant='h5' component='div' sx={{marginTop: '10px'}}>
                        Replies:
                    </Typography>
                        {replies.map((reply, index) => (
                        <div key={index}>
                            <b>{reply.author}</b>:
                            <p>{reply.content}</p>
                        </div>
                        ))}
                    </div>
                    )}
            </CardContent>
            <CardActions sx={{}}>
                <Button sx={{color: '#b3cdf5'}} size='small' onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </Button>
                <Button sx={{color: '#b3cdf5'}} size='small' onClick={() => setShowReplies(!showReplies)}>
                    Replies
                </Button>
                {userId === userIDLocal &&
                    <Button sx={{color: '#b3cdf5'}} size='small' onClick={() => {
                            console.log("deleting post", _id)
                            fetch('/api/deletePost', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId,
                                    _id,
                                  })
                            });
                        }
                    }>del</Button>}
            </CardActions>
            {showReplyForm && (
                <ReplyForm className="reply-form" sx={{color: '#b3cdf5'}}
                    onSubmit={replyContent => addReply(_id, userIDLocal, userNameLocal, replyContent)}
                />
            )}
        </Card>
    )
}
