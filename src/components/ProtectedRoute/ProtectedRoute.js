import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  // Get user from localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  // Check if user is authenticated
  const isAuthenticated = user?.isAuthenticated;
  
  // Mock role check (you would typically get this from your user object)
  const userRole = user?.role || 'student'; // default to student for now
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  if (role && role !== userRole) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'student':
        return <Navigate to="/student" replace />;
      case 'supervisor':
        return <Navigate to="/supervisor" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute; 