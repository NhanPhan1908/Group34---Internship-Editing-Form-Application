import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Thêm state cho role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, role);  // Hiển thị email, password và role trong console

    // Sau khi đăng nhập thành công, điều hướng đến Dashboard
    if (email && password && role) { // Kiểm tra nếu email, password và role không rỗng
      navigate('/dashboard'); // Điều hướng đến Dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Supervisor">Supervisor</option>
          <option value="Student">Student</option>
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
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
