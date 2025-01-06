import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserManagerStudent.css";

function UserManagerStudent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    major: "",
    unit: "",
    year: "",
    location: "",
    phone: "",
    topic: "",
    valid: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true); // Thêm loading state
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false); // Thêm state refetch để gọi lại useEffect

  useEffect(() => {
    setLoading(true); // Bắt đầu trạng thái loading
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        console.log("API Response:", response.data); // Log dữ liệu để kiểm tra
        setStudents(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Kết thúc loading
        setError(""); // Xóa lỗi (nếu trước đó có)
      })
      .catch((error) => {
        console.error("Có lỗi khi gọi API:", error); // Log lỗi ra console

        // Kiểm tra từng loại lỗi
        if (error.response) {
          // Lỗi từ phía server (4xx, 5xx)
          setError(`Lỗi từ server: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          // Không nhận được phản hồi từ server
          setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối!");
        } else {
          // Các lỗi khác
          setError(`Đã xảy ra lỗi: ${error.message}`);
        }

        setLoading(false); // Kết thúc loading
      });
  }, [refetch]); // Thêm refetch vào dependency để gọi lại khi refetch thay đổi

  // Lọc dữ liệu sinh viên theo các filter
  const filteredData = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      student.major.toLowerCase().includes(filters.major.toLowerCase()) &&
      student.unit.toLowerCase().includes(filters.unit.toLowerCase()) &&
      student.year.toLowerCase().includes(filters.year.toLowerCase()) &&
      student.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      student.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
      student.topic.toLowerCase().includes(filters.topic.toLowerCase())
    );
  });

  // Các hàm phân trang
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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset trang khi thay đổi filter
  };

  const handleRowClick = (student) => {
    navigate(`/admin-dashboard/user-manager-student-detail/${student.id}`, { state: { student } });
  };

  const handleRefetch = () => {
    setRefetch((prev) => !prev); // Đổi giá trị của refetch để gọi lại useEffect
  };

  return (
    <div className="user-manager-student">
      {/* Nếu đang load, hiển thị thông báo loading */}
      {loading && <div>Loading...</div>}

      {/* Nút để gọi lại useEffect */}
      <button 
        onClick={handleRefetch} 
        className="refresh-button"
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Refresh Data
      </button>

      {/* Các trường tìm kiếm và lọc */}
      <div className="top-actions">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          name="name"
        />
        {/* Các trường lọc khác */}
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Major</th>
            <th>Unit</th>
            <th>Year</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Topic</th>
            <th>Validation</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((student) => (
            <tr
              key={student.id}
              onClick={() => handleRowClick(student)}
              className="clickable-row"
            >
              <td>{student.name}</td>
              <td>{student.date_of_birth}</td>
              <td>{student.major}</td>
              <td>{student.unit}</td>
              <td>{student.year}</td>
              <td>{student.location}</td>
              <td>{student.phone}</td>
              <td>{student.topic}</td>
              <td>{student.valid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
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

export default UserManagerStudent;
