import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./WorkManagerAdmin.css";

function WorkManagerAdmin() {
  const navigate = useNavigate();

  const dummyData = {
    recentFiles: [
      { id: 1, name: "Proposal File 1", date: "2024-11-01", image: "https://picsum.photos/200/150?random=1" },
      { id: 2, name: "Internship Contract 2", date: "2024-10-30", image: "https://picsum.photos/200/150?random=2" },
    ],
    procedureDocumentation: {
      student: Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        name: `Student Doc ${index + 1}`,
        date: `2024-10-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 10}`,
      })),
      supervisor: Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        name: `Supervisor Doc ${index + 1}`,
        date: `2024-09-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 20}`,
      })),
    },
    otherDocumentation: Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      name: `Other Doc ${index + 1}`,
      date: `2024-07-${(index % 30) + 1}`,
    })),
    tasks: [
      { id: 1, title: "Submit Proposal", deadline: "2024-11-05" },
      { id: 2, title: "Meeting with Supervisor", deadline: "2024-11-07" },
      { id: 3, title: "Upload Final Report", deadline: "2024-11-20" },
    ],
  };

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderFileCard = (file) => (
    <div key={file.id} className="admin-file-card" onClick={() => navigate(`document-edit-admin/${file.id}`)}>
      <img src={file.image} alt={file.name} className="admin-file-image" />
      <div className="admin-file-name">{file.name}</div>
      <div className="admin-file-date">{file.date}</div>
    </div>
  );

  return (
    <div className="admin-work-manager-layout">
      <div className="admin-work-manager-container">
        
        <div className="admin-top-actions">
          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search files..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <div className="admin-filter-actions">
            <button className="admin-action-button admin-action-button--all">All</button>
            <button className="admin-action-button admin-action-button--new">New</button>
            <button className="admin-action-button admin-action-button--old">Old</button>
          </div>
        </div>

        <div className="admin-section">
          <h2>Recent Files</h2>
          <div className="admin-grid-container">
            {dummyData.recentFiles.map(renderFileCard)}
          </div>
        </div>

        <div className="admin-section">
          <h2>All Documentation</h2>
          <div className="admin-doc-section">
            <h3>Procedure Documentation</h3>
            <div className="admin-grid-container">
              {dummyData.procedureDocumentation.student.map(renderFileCard)}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-time-management-sidebar">
        <h2>Time Management</h2>

        <div className="admin-calendar-container">
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="admin-task-list">
          <h3>Upcoming Tasks</h3>
          <ul>
            {dummyData.tasks.map((task) => (
              <li key={task.id} className="admin-task-item">
                <div className="admin-task-title">{task.title}</div>
                <div className="admin-task-deadline">{task.deadline}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkManagerAdmin;
