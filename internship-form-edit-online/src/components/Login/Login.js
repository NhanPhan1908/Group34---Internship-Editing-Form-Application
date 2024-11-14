import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    console.log(`Mock login successful as ${role}`);
    
    // Store mock user data with selected role
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: role,
      isAuthenticated: true
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Navigate based on role
    navigate(`/${role}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Please select your role to continue</p>
        
        <div className="login-buttons">
          <button 
            className="role-btn student-btn"
            onClick={() => handleLogin('student')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google logo" 
            />
            Login as Student
          </button>

          <button 
            className="role-btn supervisor-btn"
            onClick={() => handleLogin('supervisor')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google logo" 
            />
            Login as Supervisor
          </button>

          <button 
            className="role-btn admin-btn"
            onClick={() => handleLogin('admin')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google logo" 
            />
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login; 