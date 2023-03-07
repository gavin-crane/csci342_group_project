const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const port = 1337;
dotenv.config();

const url = process.env.DATABASE_URL;
console.log("db url: " + url);


//schema for post
const post = new mongoose.Schema({
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

// schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});
const User = mongoose.model('users', userSchema);

mongoose.set('strictQuery', false);
mongoose.connect(url).then(() => {
    console.log('DB Connection successful!');
})
.catch((error) => {
    console.log('Connection error:', error);
});

app.post('/api/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body
    
    if (!username || !password || !confirmPassword) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }

    bcrypt.hash(password, 12, function(err, hash) {
        if(err) {
            return res.json({
                status: 'fail',
                message: 'Failed to hash password'
            })
        }
        User.create({username, password: hash}).then((user) => {
            return res.status(200).json({
                status: 'success',
                message: "User created successfully!",
                data: {
                    user
                }
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: 'fail',
                message: "An error occurred while creating user",
                err: err
            });
        });    
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
    User.findOne({username}).then((user) => {
        if(!user) {
            return res.json({
                status: 'fail',
                message: 'Invalid email or password!'
            })
        }
        bcrypt.compare(password, user.password, function(err, isCorrectPassword) {
            if (err) {
                return res.json({
                    status: 'fail',
                    message: 'Failed to compare passwords'
                })
            }
            if (!isCorrectPassword) {
                return res.json({
                    status: 'fail',
                    message: 'Invalid username or password'
                })
            }
            res.json({
                status: 'success',
                message: 'Login successful!',
                data: {
                    user
                }
            })
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 'fail',
            message: 'Failed to find user',
            err: err
        });
    }); 
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