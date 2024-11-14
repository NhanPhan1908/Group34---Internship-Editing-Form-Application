import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DocumentList from '../components/DocumentList/DocumentList';

// Supervisor Dashboard sub-components
const PendingReviews = () => <DocumentList documents={[]} />;
const Profile = () => <div>Supervisor Profile</div>;
const Students = () => <div>Student List</div>;

function SupervisorDashboard() {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/supervisor">Dashboard Home</Link>
        <Link to="/supervisor/reviews">Pending Reviews</Link>
        <Link to="/supervisor/students">My Students</Link>
        <Link to="/supervisor/profile">Profile</Link>
      </nav>

      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h1>Welcome to Supervisor Dashboard</h1>} />
          <Route path="reviews" element={<PendingReviews />} />
          <Route path="students" element={<Students />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default SupervisorDashboard; 