import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP
import './Signup.css';


function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      // Gửi yêu cầu đăng ký tới backend
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        role,
        password,
      });
  
      if (response.status === 201) { // Xử lý khi đăng ký thành công
        alert('Sign up successful! Please log in with your new account.');
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert(error.response?.data?.message || 'An error occurred during sign up.');
    } finally {
  
      navigate('/');
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button onClick={() => navigate('/signup')} type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
