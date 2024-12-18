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
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");

  const itemsPerPage = 8;

  const filteredData = dummyData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = filter === "all" || item.date.startsWith(filter);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil((filteredData.length + 1) / itemsPerPage);
  const paginatedData = [
    ...filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1),
    { id: "add", name: "Add New File", date: "", image: "https://via.placeholder.com/200x150?text=+" },
  ];

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
    if (id === "add") {
      navigate("/create"); 
    } else {
      navigate(`/student-dashboard/document-edit/${id}`); 
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setCurrentPage(1);
  };

  return (
    <div className="work-manager-container">
      <div className="work-manager-top-actions">
        <div className="work-manager-search-bar">
          <input
            type="text"
            placeholder="Search files..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="work-manager-filter-actions">
          <button onClick={() => handleFilterChange("all")}>All</button>
          <button onClick={() => handleFilterChange("2024-11-01")}>New</button>
          <button onClick={() => handleFilterChange("2024-11-30")}>Old</button>
          <button onClick={() => handleFilterChange("usual")}>Usual</button>
        </div>
      </div>
      <div className="work-manager-grid-container">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className={`work-manager-grid-item ${item.id === "add" ? "work-manager-add-item" : ""}`}
            onClick={() => handleImageClick(item.id)}
          >
            <img src={item.image} alt={item.name} />
            <div className="work-manager-file-name">{item.name}</div>
            <div className="work-manager-update-date">{item.date}</div>
          </div>
        ))}
      </div>
      <div className="work-manager-pagination">
        <button
          className="work-manager-previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`work-manager-page-number ${currentPage === index + 1 ? "work-manager-active-page" : ""}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="work-manager-next"
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
