const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const port = 1337;
dotenv.config();

const url = process.env.DATABASE_URL;
console.log("db url: " + url);

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
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

const User = mongoose.model('User', userSchema);
const options = {};
const url = process.env.DATABASE_URL

mongoose.set('strictQuery', false);

mongoose.connect(url, options)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('hello world')
})


app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({
      status: 'fail',
      message: 'All input fields are required!',
      data: null,
    });
  }

  try{
    const hashword = await bcrypt.hash(password, 12)
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashword
    })
    console.log(user)
    return res.json({
      status: 'success',
      message: 'User created successfully',
      data: {       
        user
      },
    });
  }
  catch(error){
    return res.status(400).json({
      status: 'fail',
      message: 'Error creating user',
      data: null,
    });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'All input fields are required!',
      data: null,
    });
  }

  try{
    const user = await User.findOne({
      email: email,
    })
  
     if (!user) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'Invalid email or password' ,
      });
    }
<<<<<<< HEAD
  
    const match = await bcrypt.compare(password, user.password);
  
    if (!match) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'Invalid email or password' ,
      });
    }
  
    return res.json({
        status: 'success',
        message: 'Login successful!',
        data: { user },
    });

  } catch (error) {
    // Return error response
    console.error(error);
    return res.status(500).json({ 
      status: 'fail',
      message: 'Error finding user' ,
    });
  }

});
=======
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
>>>>>>> faaf1599dfa1d63a1f7f9792e03a54a9ca2a34de

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.post('/api/update', async (req, res) => {
    const { firstName, lastName, password, email, major, gradYear, favLang, bio } = req.body;
  
    if (!firstName || !email) {
      return res.status(400).json({
        status: 'fail',
        message: 'First name and email required!',
        data: null,
      });
    }
  
    try{
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        email: email,
        major: major,
        gradYear: gradYear,
        favLang: favLang,
        bio: bio
      })
      console.log(user)
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















