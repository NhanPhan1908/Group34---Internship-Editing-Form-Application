require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
app.use(express.json())

const { tokenController, logoutController, loginController } = require('./authController');
const { createFormController, getFormByIdController, updateFormController, deleteFormController } = require('./formController');
const authenticateToken = require('./authMiddleware');

const users = []

app.post('/token', tokenController);

app.delete('/logout', logoutController);

app.post('/login', loginController);

const posts = [
    { username: 'Saul', password: 'Goodman' },
    { username: 'Kim', password: 'Wexler' }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/forms', createFormController);

app.get('/forms/:id', getFormByIdController);

app.put('/forms/:id', updateFormController);

app.delete('/forms/:id', deleteFormController);

app.get('/', (req, res) => {
    res.json('Hello, World!');
});

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed !!!')
        }
    } catch {
        res.status(500).send()
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3000/', // Chỉ cho phép frontend từ localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));