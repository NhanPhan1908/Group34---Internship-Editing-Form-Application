import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkManagerAdmin.css";

function WorkManagerAdmin() {
  const navigate = useNavigate();

  const dummyData = {
    Proposal: {
      2019: Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        name: `Proposal File ${index + 1}`,
        date: `2019-11-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 1}`,
      })),
      2020: Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        name: `Proposal File ${index + 9}`,
        date: `2020-11-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 9}`,
      })),
    },
    InternshipContract: {
      2019: Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        name: `Internship Contract ${index + 1}`,
        date: `2019-11-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 17}`,
      })),
      2020: Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        name: `Internship Contract ${index + 9}`,
        date: `2020-11-${(index % 30) + 1}`,
        image: `https://picsum.photos/200/150?random=${index + 25}`,
      })),
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("Proposal");
  const [selectedYear, setSelectedYear] = useState(2019);

  const itemsPerPage = 8;

  const filteredData = dummyData[selectedType][selectedYear].filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
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

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="work-manager-container">
      <div className="top-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search files..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-actions">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("new")}>New</button>
          <button onClick={() => setFilter("old")}>Old</button>
        </div>
      </div>

      <div className="type-dropdown">
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="Proposal">Proposal</option>
          <option value="InternshipContract">Internship Contract</option>
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
        </select>
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
        <button onClick={handlePrevious} disabled={currentPage === 1}>
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
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default WorkManagerAdmin;
