import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkManager.css";


function WorkManager() {
  const navigate = useNavigate();

  const dummyData = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `File ${index + 1}`,
    date: `2024-11-${(index % 30) + 1}`,
    image: `https://picsum.photos/200/150?random=${index + 1}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const paginatedData = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleImageClick = (id) => {
    navigate(`/edit/${id}`);
  };

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
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className="grid-item"
            onClick={() => handleImageClick(item.id)}
          >
            <img src={item.image} alt={item.name} />
            <div className="file-name">{item.name}</div>
            <div className="update-date">{item.date}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WorkManager;
