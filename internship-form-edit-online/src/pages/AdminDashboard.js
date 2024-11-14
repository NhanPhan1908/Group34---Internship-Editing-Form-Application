import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DocumentList from '../components/DocumentList/DocumentList';

// Admin Dashboard sub-components
const AllDocuments = () => <DocumentList documents={[]} />;
const Users = () => <div>User Management</div>;
const Settings = () => <div>System Settings</div>;

function AdminDashboard() {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/admin">Dashboard Home</Link>
        <Link to="/admin/documents">All Documents</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/settings">Settings</Link>
      </nav>

      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
          <Route path="documents" element={<AllDocuments />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard; 