import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBarStudent.css';

function SideBarStudent() {
  const [activeSection, setActiveSection] = useState(null);

  const studentSections = {
    dashboard: {
      label: "Dashboard",
      links: [
        { path: "/student-dashboard/overview", label: "Overview" },
        { path: "/student-dashboard/progress", label: "Progress" },
      ]
    },
    documents: {
      label: "Documents",
      links: [
        { path: "/student-dashboard/document-manager", label: "Document Manager" },
        { path: "/student-dashboard/upload", label: "Upload Documents" },
      ]
    },
    profile: {
      label: "Profile",
      links: [
        { path: "/student-dashboard/personal-info", label: "Personal Info" },
        { path: "/student-dashboard/settings", label: "Settings" },
      ]
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="sidebar-student">
      {Object.keys(studentSections).map((section) => (
        <div key={section}>
          <div
            className={`sidebar-item ${activeSection === section ? 'active' : ''}`}
            onClick={() => toggleSection(section)}
          >
            <span>{studentSections[section].label}</span>
          </div>
          {activeSection === section && (
            <div className="submenu">
              {studentSections[section].links.map((link) => (
                <Link to={link.path} key={link.label}>{link.label}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBarStudent;
