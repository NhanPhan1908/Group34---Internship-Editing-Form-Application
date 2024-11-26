import React, { useState } from 'react';
import './UserManager.css';

function UserManager() {
  const [selectedTab, setSelectedTab] = useState('student'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    major: '',
    unit: '',
    year: '',
    location: '',
  });

  const students = [
    { id: 1, name: "Nguyen Thi Mai", major: "ICT", studentId: "2021001", course: "ICT", unit: "Lab", location: "Costume" },
    { id: 2, name: "Le Hoang Nam", major: "DS", studentId: "2021002", course: "DS", unit: "Company", location: "Foreign" },
    { id: 3, name: "Tran Thi Lan", major: "CS", studentId: "2021003", course: "CS", unit: "Lab", location: "Costume" },
    
  ];

  const supervisors = [
    { id: 1, name: "Pham Minh Tuan", unit: "USTH", phone: "0123456789", studentCount: 5 },
    { id: 2, name: "Nguyen Thi Lan", unit: "Company", phone: "0987654321", studentCount: 3 },
    
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = students
    .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((student) => (filters.major ? student.major === filters.major : true))
    .filter((student) => (filters.unit ? student.unit === filters.unit : true))
    .filter((student) => (filters.year ? student.studentId.startsWith(filters.year) : true))
    .filter((student) => (filters.location ? student.location === filters.location : true));

  const filteredSupervisors = supervisors
    .filter((supervisor) => supervisor.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((supervisor) => (filters.unit ? supervisor.unit === filters.unit : true));

  return (
    <div className="user-manager-container">
      <div className="tab-container">
        <button onClick={() => setSelectedTab('student')} className={selectedTab === 'student' ? 'active' : ''}>
          Sinh viên
        </button>
        <button onClick={() => setSelectedTab('supervisor')} className={selectedTab === 'supervisor' ? 'active' : ''}>
          Supervisor
        </button>
      </div>

      <div className="user-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="filters">
          <select name="major" value={filters.major} onChange={handleFilterChange}>
            <option value="">Chọn Chuyên Ngành</option>
            <option value="ICT">ICT</option>
            <option value="DS">DS</option>
            <option value="CS">CS</option>
          </select>

          <select name="unit" value={filters.unit} onChange={handleFilterChange}>
            <option value="">Chọn Đơn Vị</option>
            <option value="Company">Công Ty</option>
            <option value="Lab">Lab</option>
          </select>

          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">Chọn Năm</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>

          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">Chọn Địa Điểm</option>
            <option value="Costume">Costume</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>
      </div>

      {selectedTab === 'student' ? (
        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Chuyên ngành</th>
                <th>Mã sinh viên</th>
                <th>Khóa học</th>
                <th>Đơn vị</th>
                <th>Địa điểm</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.major}</td>
                  <td>{student.studentId}</td>
                  <td>{student.course}</td>
                  <td>{student.unit}</td>
                  <td>{student.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="supervisor-table">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Đơn vị công tác</th>
                <th>SĐT</th>
                <th>Số sinh viên quản lý</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupervisors.map((supervisor, index) => (
                <tr key={supervisor.id}>
                  <td>{index + 1}</td>
                  <td>{supervisor.name}</td>
                  <td>{supervisor.unit}</td>
                  <td>{supervisor.phone}</td>
                  <td>{supervisor.studentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManager;
