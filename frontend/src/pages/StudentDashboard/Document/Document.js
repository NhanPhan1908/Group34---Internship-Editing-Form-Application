import React, { useState } from 'react';
import './Document.css';
import axios from 'axios';
import { useEffect } from 'react';

function Document() {
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({ sort: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  useEffect(() => {
    // Lấy danh sách tài liệu từ backend
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/forms/submit');
        setDocuments(response.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDocuments = documents
    .filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((doc) => {
      if (filters.type && filters.type !== "all" && doc.dataType.toLowerCase() !== filters.type) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.updatedDate) - new Date(a.updatedDate);
      } else if (filters.sort === "oldest") {
        return new Date(a.updatedDate) - new Date(b.updatedDate);
      }
      return 0;
    });

  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setDocuments((prev) =>
      prev.map((doc) => ({ ...doc, selected: isChecked })));
  };

  const toggleSelectDocument = (id, selected) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, selected } : doc
      ));
  };

  return (
    <div className="document-container">
      
      <div className="document-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search documents"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        
        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            Sort by Date
          </button>
          {showSortMenu && (
            <div className="dropdown-menu">
              <button onClick={(e) => handleFilterChange(e)} name="sort" value="newest">Newest First</button>
              <button onClick={(e) => handleFilterChange(e)} name="sort" value="oldest">Oldest First</button>
            </div>
          )}
        </div>

        
        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() => setShowTypeMenu(!showTypeMenu)}
          >
            Document Type
          </button>
          {showTypeMenu && (
            <div className="dropdown-menu">
              <button onClick={(e) => handleFilterChange(e)} name="type" value="pdf">PDF</button>
              <button onClick={(e) => handleFilterChange(e)} name="type" value="word">Word</button>
              <button onClick={(e) => handleFilterChange(e)} name="type" value="excel">Excel</button>
              <button onClick={(e) => handleFilterChange(e)} name="type" value="image">Image</button>
              <button onClick={(e) => handleFilterChange(e)} name="type" value="all">All Types</button>
            </div>
          )}
        </div>

        
        <button
          className="reset-button"
          onClick={() => {
            setFilters({ sort: "", type: "" });
            setSearchQuery(""); 
          }}
        >
          Reset
        </button>

        <button className="add-button">+</button>
      </div>

      {/* Table */}
      <table className="document-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={toggleSelectAll} />
            </th>
            <th>Tên giấy tờ</th>
            <th>Ngày cập nhật</th>
            <th>Ngày hết hạn</th>
            <th>Loại dữ liệu</th>
            <th>Tình trạng</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc) => (
            <tr key={doc.id}>
              <td>
                <input
                  type="checkbox"
                  checked={doc.selected}
                  onChange={(e) => toggleSelectDocument(doc.id, e.target.checked)}
                />
              </td>
              <td>{doc.title}</td>
              <td>{doc.updatedDate}</td>
              <td>{doc.expiryDate}</td>
              <td>{doc.dataType}</td>
              <td>
                <span className={`status ${doc.status.toLowerCase()}`}>
                  {doc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Document;
