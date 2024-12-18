require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3001', // URL frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Controllers và Middleware
const { tokenController, logoutController, loginController } = require('./authController');
const { createFormController, getFormByIdController, updateFormController, deleteFormController } = require('./formController');
const authenticateToken = require('./authMiddleware');

// Routes
app.post('/token', tokenController);

app.delete('/logout', logoutController);

app.post('/login', loginController);

const posts = [
    { username: 'Saul', password: 'saul123', title: 'Goodman' },
    { username: 'Kim', password: 'kim456', title: 'Wexler' },
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

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
