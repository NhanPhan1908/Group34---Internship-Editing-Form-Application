import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  

function Sidebar() {
  const [isDriveOpen, setIsDriveOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleDrive = () => setIsDriveOpen(!isDriveOpen);
  const toggleShare = () => setIsShareOpen(!isShareOpen);

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={toggleDrive}>
        <span>My Drive</span>
        {isDriveOpen && (
          <div className="submenu">
            <Link to="/drive/classroom">Classroom</Link>
            <Link to="/drive/recent">Recent</Link>
            <Link to="/drive/starred">Starred</Link>
          </div>
        )}
      </div>
      <div className="sidebar-item" onClick={toggleShare}>
        <span>Shared with me</span>
        {isShareOpen && (
          <div className="submenu">
            <Link to="/shared/drive">Shared Drive</Link>
            <Link to="/shared/document">Shared Document</Link>
          </div>
        )}
      </div>
      <div className="sidebar-item">
        <Link to="/item3">Item 3</Link>
      </div>
    </div>
  );
}

export default Sidebar;
