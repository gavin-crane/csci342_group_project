var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express()
app.use(express.json())

const port = process.env.PORT

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















