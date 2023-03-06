const express = require('express');
const app = express()
app.use(express.json())
const port = 1337

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})