const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 1337;
dotenv.config();

const url = process.env.DATABASE_URL;
console.log("db url: " + url);


//schema for post
const post = new mongoose.Schema({
    userid:{
        type: 'String',
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    replies: {
        type: Object
    },
});

mongoose.set('strictQuery', false);
mongoose.connect(url).then(() => {
    console.log('DB Connection successful!');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });

const users = [];
app.post('/api/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body
    
    if (!username || !password || !confirmPassword) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }

    const user = {
        username,
        password,
        confirmPassword
    }
    users.push(user)

    res.json({
        status:'success',
        message: 'signup successful',
        data: {
            user
        }
    })
    
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }
    const user = users.find(user => user.username === username && user.password === password)
    if(!user) {
        return res.json({
            status: 'fail',
            message: 'Invalid username or password'
        })
    }
    res.json({
        status: 'success',
        message: 'logged in successfully',
        data: {
            user
        }
    })

})

app.post('/api/submitPost', (req, res) => {

    console.log(req.body);
    const {title, body, replies} = req.body;
    console.log("submitPost endpoint:",title, body, replies);

    if (!title || !body || !replies) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }
    const Post = mongoose.model('Post', post);
    Post.create({
        title,
        body,
        replies,
    })
    .then((newPost) => {
        return res.status(200).json({ message: "User created successfully", pos: newPost });
    })
    .catch((err) => {
        return res.status(500).json({ error: "An error occurred while adding a post", err: err});
    });    
})

app.get('/api/getPost', (req, res) => {
    const {user, title, body} = req.body;

    if (!user || !title || !body) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})