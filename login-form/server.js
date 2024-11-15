// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // replace with your MySQL username
    password: '',       // replace with your MySQL password
    database: 'login_db' // ensure this matches your MySQL database name
});

db.connect(err => {                 
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Register route
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    // Check if all fields are provided
    if (!username || !password || !role) {
        return res.send('Please fill out all fields.');
    }

    // Check if the role is valid
    const validRoles = ['admin', 'student', 'supervisor'];
    if (!validRoles.includes(role.toLowerCase())) {
        return res.send('Invalid role. Please choose admin, student, or supervisor.');
    }

    // Check if the username already exists in the database
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.send('An error occurred. Please try again.');
        }

        if (results.length > 0) {
            // Username already exists
            return res.send('Username already exists');
        }

        // If username is unique, hash the password and insert the new user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.send('An error occurred while processing your registration.');
            }

            console.log('Hashed Password:', hashedPassword); // Log the hashed password

            // Insert the new user into the database
            db.query(
                'INSERT INTO user (username, password, role) VALUES (?, ?, ?)',
                [username, hashedPassword, role.toLowerCase()],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.send('An error occurred. Please try again.');
                    }
                    res.send('Registration successful! You can now log in.');
                }
            );
        });
    });
});

// Login route with redirection to role-based dashboards
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
        return res.send('Please enter both username and password.');
    }

    db.query('SELECT * FROM user WHERE username = ?', [trimmedUsername], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.send('An error occurred. Please try again.');
        }

        if (results.length === 0) {
            console.log('User  not found:', trimmedUsername);
            return res.send('User  not found.');
        }

        const user = results[0];

        // Debugging: Log the entered and stored passwords
        console.log('Entered Password:', trimmedPassword);
        console.log('Stored Hashed Password:', user.password);

        // Compare the entered password with the stored hashed password
        bcrypt.compare(trimmedPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.send('An error occurred. Please try again.');
            }

            console.log('Password Match:', isMatch); // Log the comparison result

            if (!isMatch) {
                return res.send('Incorrect password.');
            }

            // Redirect to role-based dashboard
            switch (user.role) {
                case 'student':
                    res.sendFile(path.join(__dirname, '../login-form/public/student/student.html'));
                    break;
                case 'supervisor':
                    res.sendFile(path.join(__dirname, '../login-form/public/supervisor/supervisor.html'));
                    break;
                case 'admin':
                    res.sendFile(path.join(__dirname, '../login-form/public/admin/admin.html')); 
                    break;
                default:
                    res.send('Role not recognized.');
            }
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});