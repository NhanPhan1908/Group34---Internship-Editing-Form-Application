import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBarAdmin.css';

function SideBarAdmin() {
  const [activeSection, setActiveSection] = useState(null);

  const adminSections = {
    users: {
      label: "User Management",
      links: [
        { path: "/admin-dashboard/manager-user", label: "Manage Users" },
        { path: "/admin-dashboard/statistic", label: "Statistics" }
      ]
    },
    forms: {
      label: "Form Management",
      links: [
        { path: "/admin-dashboard/form-manager", label: "Form Manager" },
      ]
    },
    settings: {
      label: "Settings",
      links: [
        { path: "/admin-dashboard/settings", label: "Admin Settings" }
      ]
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="sidebar-admin">
      {Object.keys(adminSections).map((section) => (
        <div key={section}>
          <div
            className={`sidebar-item ${activeSection === section ? 'active' : ''}`}
            onClick={() => toggleSection(section)}
          >
            <span>{adminSections[section].label}</span>
          </div>
          {activeSection === section && (
            <div className="submenu">
              {adminSections[section].links.map((link) => (
                <Link to={link.path} key={link.label}>{link.label}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBarAdmin;
