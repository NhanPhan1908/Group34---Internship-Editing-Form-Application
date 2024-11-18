import React from "react";
import "./WorkManager.css";

function WorkManager() {
  const dummyData = [
    { id: 1, name: "File A", date: "2024-11-01", image: "image1.jpg" },
    { id: 2, name: "File B", date: "2024-11-10", image: "image2.jpg" },
    { id: 3, name: "File C", date: "2024-11-15", image: "image3.jpg" },
    { id: 4, name: "File D", date: "2024-11-17", image: "image4.jpg" },
    { id: 1, name: "File A", date: "2024-11-01", image: "image1.jpg" },
    { id: 2, name: "File B", date: "2024-11-10", image: "image2.jpg" },
    { id: 3, name: "File C", date: "2024-11-15", image: "image3.jpg" },
    { id: 4, name: "File D", date: "2024-11-17", image: "image4.jpg" },
    { id: 1, name: "File A", date: "2024-11-01", image: "image1.jpg" },
    { id: 2, name: "File B", date: "2024-11-10", image: "image2.jpg" },
    { id: 3, name: "File C", date: "2024-11-15", image: "image3.jpg" },
    { id: 4, name: "File D", date: "2024-11-17", image: "image4.jpg" },
    { id: 1, name: "File A", date: "2024-11-01", image: "image1.jpg" },
    { id: 2, name: "File B", date: "2024-11-10", image: "image2.jpg" },
    { id: 3, name: "File C", date: "2024-11-15", image: "image3.jpg" },
    { id: 4, name: "File D", date: "2024-11-17", image: "image4.jpg" },
    
  ];

  return (
    <div className="work-manager">
      <div className="top-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search files..." />
        </div>
        <div className="filter-actions">
          <button>New</button>
          <button>Old</button>
          <button>Usual</button>
          <button className="add-button">+</button>
        </div>
      </div>
      <div className="grid-container">
        {dummyData.map((item) => (
          <div key={item.id} className="grid-item">
            <img src={item.image} alt={item.name} />
            <div className="file-name">{item.name}</div>
            <div className="update-date">{item.date}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
      <button className="previous">Previous</button>
      <button className="number active">1</button>
  <button className="number">2</button>
  <button className="number">3</button>
  <button className="next">Next</button>
      </div>
    </div>
  );
}

export default WorkManager;
