const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const port = process.env.PORT || 1337;
dotenv.config();

const url = process.env.DATABASE_URL;
console.log("db url: " + url);


//schema for post
const postSchema = new mongoose.Schema({
    userId:{
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    chipData: {
      type: Object
    },
    codeLink: {
      type: String
    },
    replies: {
      type: []
    }
});

// schema for user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  major: {
    type : String,
    required: false
  }, 
  gradYear: {
    type : String,
    required: false
  }, 
  favLang: {
    type : String,
    required: false
  } , 
  bio: {
    type : String,
    required: false
  } 
});

const Post = mongoose.model('Post', postSchema);
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
        const newUser = {
          username: username,
          password: hash,
          firstName: '',
          lastName: '',
          major: '',
          gradYear: '',
          favLang: '',
          bio: ''
        }
        User.create(newUser).then((user) => {
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


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'All input fields are required!',
      data: null,
    });
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
app.post('/api/submitReply', async (req, res) => {
  const { postID, userID, author, content } = req.body;
  console.log("submit comment userID", userID);
  console.log("submit comment author", author);
  console.log("submit comment content", content);

  try {
    const post = await Post.findOne({_id:postID});

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newReply = {
      userID,
      author,
      content,
    };

    post.replies.push(newReply);

    await post.save();

    res.status(200).json({"replies":post.replies});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/submitPost', (req, res) => {

    // console.log(req.body);
    const {userId, userName, title, body, chipData, codeLink, replies} = req.body;
    // console.log("submitPost endpoint:", userId, userName, title, body, chipData, codeLink);

    if (!userId) {
      return res.json({
        status: 'fail',
        message: 'no userid'
      })
    }
    else if (!userName) {
      return res.json({
        status: 'fail',
        message: 'no user name'
      })
    }
    else if (!title) {
      return res.json({
        status: 'fail',
        message: 'no title'
      })
    }
    else if (!body) {
      return res.json({
        status: 'fail',
        message: 'no body'
      })
    }
    else if (!chipData) {
      return res.json({
        status: 'fail',
        message: 'no chips'
      })
    }
    else if (!replies) {
      return res.json({
        status: 'fail',
        message: 'no chips'
      })
    }
/*
    if(!codeLink){
      codeLink = "";
    }
*/
    Post.create({
        userId,
        userName,
        title,
        body,
        chipData,
        codeLink,
        replies: replies || []
    })
    .then((newPost) => {
        return res.status(200).json({ message: "post created successfully", pos: newPost });
    })
    .catch((err) => {
        return res.status(500).json({ error: "An error occurred while adding a post", err: err});
    });    
});

app.post('/api/deletePost', (req,res) => {
  const {userId, _id} = req.body
  console.log(req.body);
  console.log("working? on ", _id, userId);
  Post.deleteOne({_id: _id},{userId: userId}).then(console.log("deleted"));
  res.status(200).json({message: "post deleted"})
});

app.get('/api/getPosts', async(req, res) => {
  try {
    // const posts = await Post.find({}).project({ title: 1, body: 1 }).toArray();
    const posts = await Post.find();
    //console.log("recieved posts",posts);
    res.json(posts);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/getPostById', async(req, res) => {
  const postID = req.query.postID;
  try {
    const post = await Post.findOne({_id:postID});
    res.json(post);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/getReplies', async(req, res) => {
  const postID = req.query.postID;
  try {
    const post = await Post.findOne({_id:postID});
    res.json(post.replies);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post('/api/getUserPosts', async (req, res) => {
  const {username} = req.body;
  try {
    const posts = await Post.find({userName: {$eq:username}});
    console.log("recieved posts",posts);
    res.json(posts);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post('/api/update', async (req, res) => {
    const { username, firstName, lastName, password, major, gradYear, favLang, bio } = req.body;
  
    if (!username) {
      return res.status(400).json({
        status: 'fail',
        message: 'Username required!',
        data: null,
      });
    }
  
    try{
      const user = await User.updateOne({username: {$eq:username}},
    {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        major: major,
        gradYear: gradYear,
        favLang: favLang,
        bio: bio
      })
      return res.json({
        status: 'success',
        message: 'User updated successfully',
        data: {       
          user
        },
      });
    }
    catch(error){
      return res.status(400).json({
        status: 'fail',
        message: 'Error updating user',
        data: null,
      });
    }
});


app.post('/api/profile', async (req, res) => {
  const {username} = req.body;

  if (!username) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username required!',
      data: null,
    });
  }

  try{
    const user = await User.findOne({username: {$eq:username}})
    return res.json({
      status: 'success',
      message: 'User updated successfully',
      data: {       
        user
      },
    });
  }
  catch(error){
    return res.status(400).json({
      status: 'fail',
      message: 'Error updating user',
      data: null,
    })
  }
});




app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
  








