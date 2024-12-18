require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let refreshTokens = [];

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token not provided' });
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token verification failed' });
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = [
        { username: 'saul', role: 'Admin', password: '1234' },
    ];

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const accessToken = generateAccessToken({ name: username });
    const refreshToken = jwt.sign({ name: username }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
