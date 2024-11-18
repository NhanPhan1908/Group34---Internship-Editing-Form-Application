import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import WorkManager from './WorkManager'; 

function TopNav() {
  return (
    <div className="topnav">
      <div className="logo">My Logo</div>
      <div className="topnav-menu">
        <Link to="/dashboard/document">Document</Link>
        <Link to="/dashboard/information">Information</Link>
        <Link to="/dashboard/setting">Setting</Link>
      </div>
      <div className="avatar">
        <img src="avatar.png" alt="User Avatar" />
      </div>
    </div>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={toggleMenu}>
        <span>Menu Item</span>
        {isOpen && (
          <div className="submenu">
            <Link to="/item1">Item 1</Link>
            <Link to="/item2">Item 2</Link>
          </div>
        )}
      </div>
      <div className="sidebar-item">
        <Link to="/item3">Item 3</Link>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <TopNav />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <WorkManager /> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
