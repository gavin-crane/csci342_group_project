import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";

export default function Reply({postDetails: {author, content, replies}}) {

    const [allReplies, setReplies] = useState([]);

    const addReply = (replyAuthor, replyContent) => {
        setReplies([...allReplies, { author: replyAuthor, content: replyContent }]);
    };
  return (
    <Card sx={{ maxWidth: 345 }}>
    
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary">
        By: {author}
      </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Upvote</Button>
        <Button size="small" onClick={() => addReply("Reply Author", "Reply Content")}>Reply</Button>
        
      </CardActions>
      {replies.map((replies, index) => (
        <Reply key={index} reply={replies} />
      ))}
    </Card>
  );
}