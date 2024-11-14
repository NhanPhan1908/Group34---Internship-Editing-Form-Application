import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DocumentList from '../components/DocumentList/DocumentList';

// Student Dashboard sub-components
const Documents = () => <DocumentList documents={[]} />;
const Profile = () => <div>Student Profile</div>;
const SubmitForm = () => <div>Submit New Form</div>;

function StudentDashboard() {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/student">Dashboard Home</Link>
        <Link to="/student/documents">My Documents</Link>
        <Link to="/student/submit">Submit Form</Link>
        <Link to="/student/profile">Profile</Link>
      </nav>

      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h1>Welcome to Student Dashboard</h1>} />
          <Route path="documents" element={<Documents />} />
          <Route path="submit" element={<SubmitForm />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboard; 