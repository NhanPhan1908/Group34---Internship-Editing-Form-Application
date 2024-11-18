import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css'; // Import file CSS cho TopNav


function TopNav() {
  return (
    <div className="topnav">
      <div className="logo">My Logo</div> 
      <div className="topnav-menu">
        <Link to="/dashboard/home">Home</Link> 
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

export default TopNav;
