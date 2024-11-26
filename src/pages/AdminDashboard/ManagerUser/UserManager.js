import React, { useState } from 'react';
import './UserManager.css';

function UserManager() {
  const [activeTab, setActiveTab] = useState("students");
  const [students] = useState([
    { id: 1, name: "Nguyễn Văn A", major: "Kỹ thuật phần mềm", studentId: "12345", course: "Kỹ thuật", company: "ABC Corp", location: "Costume" },
    { id: 2, name: "Trần Thị B", major: "Kinh tế", studentId: "12346", course: "Kinh tế", company: "XYZ Lab", location: "Foreign" },
    
  ]);
  const [supervisors] = useState([
    { id: 1, name: "Lê Văn C", department: "USTH", phone: "0987654321", numOfStudents: 5 },
    { id: 2, name: "Phan Thị D", department: "Company", phone: "0912345678", numOfStudents: 3 },

  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="user-manager-container">
    
      <div className="tabs">
        <button className={`tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => handleTabClick("students")}>Sinh viên</button>
        <button className={`tab ${activeTab === 'supervisors' ? 'active' : ''}`} onClick={() => handleTabClick("supervisors")}>Supervisor</button>
      </div>

      
      {activeTab === "students" && (
        <table className="user-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Chuyên ngành</th>
              <th>Mã Sinh Viên</th>
              <th>Khóa học</th>
              <th>Đơn vị</th>
              <th>Địa điểm</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.major}</td>
                <td>{student.studentId}</td>
                <td>{student.course}</td>
                <td>{student.company}</td>
                <td>{student.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
      {activeTab === "supervisors" && (
        <table className="user-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Đơn vị công tác</th>
              <th>SĐT</th>
              <th>Số sinh viên quản lý</th>
              <th>Thông tin chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map((supervisor, index) => (
              <tr key={supervisor.id}>
                <td>{index + 1}</td>
                <td>{supervisor.name}</td>
                <td>{supervisor.department}</td>
                <td>{supervisor.phone}</td>
                <td>{supervisor.numOfStudents}</td>
                <td>
                  <button className="detail-button" onClick={() => alert(`Xem chi tiết: ${supervisor.name}`)}>Xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManager;
