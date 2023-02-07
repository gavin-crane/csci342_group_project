import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'


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

const ReplyThread = ({ reply }) => {
    const [replies, setReplies] = useState([])
    const [upvotes, setUpvotes] = useState(0)

    const addReply = (replyAuthor, replyContent) => {
        setReplies([...replies, { author: replyAuthor, content: replyContent }])
    }

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant='subtitle1'>
                    {reply.author}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {reply.content}
                    {upvotes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={() => setUpvotes(upvotes + 1)}>
                    Upvote
                </Button>
                {/* <Button size="small" onClick={() => addReply("Reply Author", "Reply Content")}>
          Reply
        </Button> */}
            </CardActions>
            {replies.map((reply, index) => (
                <ReplyThread key={index} reply={reply} />
            ))}
        </Card>
    )
}

export default function MainThread({postDetails: { title, author, content }}) {
    const [replies, setReplies] = useState([])
    const [upvotes, setUpvotes] = useState(0)
    const [hasUpvoted, setHasUpvoted] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)

    const addReply = (replyAuthor, replyContent) => {
        setReplies([...replies, { author: replyAuthor, content: replyContent }])
        setShowReplyForm(false)
    }

    return (
        <Card sx={{ maxWidth: 345, marginTop: 2, }}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant='subtitle1' color='text.secondary'>
                    By: {author}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={() => {
                    if (!hasUpvoted) {
                        setUpvotes(upvotes + 1)
                        setHasUpvoted(true) 
                    }
                }}>                    
                Upvote
                </Button>
                <Button size='small' onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </Button>
                {upvotes}
            </CardActions>
            {showReplyForm && (
                <ReplyForm
                    onSubmit={replyContent => addReply('Reply Author', replyContent)}
                />
            )}
            {replies.map((reply, index) => (
                <ReplyThread key={index} reply={reply} />
            ))}
        </Card>
    )
}
