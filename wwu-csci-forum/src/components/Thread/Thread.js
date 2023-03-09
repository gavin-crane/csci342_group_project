import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip';

import {FormControl, Select, MenuItem} from '@mui/material'


const userName = JSON.parse(localStorage.getItem('user')).username;

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

// const ReplyThread = ({ reply }) => {
//     const [replies, setReplies] = useState([])
//     const [upvotes, setUpvotes] = useState(0)
//     const [hasUpvoted, setHasUpvoted] = useState(false)

//     const addReply = (replyAuthor, replyContent) => {
//         setReplies([...replies, { author: replyAuthor, content: replyContent }])
//     }

//     return (
//         <Card>
//             <CardContent>
//                 <Typography gutterBottom variant='subtitle1'>
//                     {reply.author}
//                 </Typography>
//                 <Typography variant='body2' color='text.secondary'>
//                     {reply.body}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button size='small' onClick={() => {
//                     if (!hasUpvoted) {
//                         setUpvotes(upvotes + 1)
//                         setHasUpvoted(true) 
//                     }}}>
//                     Upvote
//                 </Button>
//                 {upvotes}
//                 {/* <Button size="small" onClick={() => addReply("Reply Author", "Reply Content")}>
//           Reply
//         </Button> */}
//             </CardActions>
//             {replies.map((reply, index) => (
//                 <ReplyThread key={index} reply={reply} />
//             ))}
//         </Card>
//     )
// }

export default function MainThread({postDetails: { title, userName, body, chipData }}) {
    const [replies, setReplies] = useState([])
    const [upvotes, setUpvotes] = useState(0)
    const [hasUpvoted, setHasUpvoted] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)

    const addReply = (replyAuthor, replyContent) => {
        console.log("reply data being passed:",replyAuthor, replyContent);
        setReplies([...replies, { author: replyAuthor, content: replyContent }])
        setShowReplyForm(false)
    }

    return (
        <Card sx={{ width: 345, 
                    height: 350, 
                    marginTop: 2, 
                    textAlign: 'left',    
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    marginLeft: '20px'}}>
            <CardContent sx={{ overflow: 'auto' }}>
                <div>
                {chipData.map(item => <Chip key={item.key} label={item.label} sx={{marginRight: '4px', marginTop: '4px'}}/>)}
                </div>
                <Typography gutterBottom variant='h5' component='div' sx={{marginTop: '10px'}}>
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant='subtitle1' color='text.secondary'>
                    By: {userName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {body}
                </Typography>
            </CardContent>
            <CardActions sx={{}}>
                <Button size='small' onClick={() => {
                    if (!hasUpvoted) {
                        setUpvotes(upvotes + 1)
                        setHasUpvoted(true) 
                    }
                }}>                    
                Upvote
                </Button>
                {upvotes}
                <Button size='small' onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </Button>
            </CardActions>
            {showReplyForm && (
                <ReplyForm
                    onSubmit={replyContent => addReply(userName, replyContent)}
                />
            )}
            <div sx={{marginLeft: '20px'}}>
              <FormControl sx={{minWidth: 200}}>
                <Select
                  displayEmpty
                  value=''
                  onChange={() => {}}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem disabled value=''>
                    Replies
                  </MenuItem>
                  {replies.map((reply, index) => (
                    <MenuItem key={index} value={reply.content}>
                      {reply.author}: {reply.content}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* {replies.map((reply, index) => (
                <ReplyThread key={index} reply={reply} />
            ))} */}
        </Card>
    )
}
