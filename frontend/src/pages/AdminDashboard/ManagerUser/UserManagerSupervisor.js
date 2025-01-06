import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagerSupervisor.css";
import axios from 'axios'; 

function UserManagerSupervisor() {
  const navigate = useNavigate();
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ backend
    axios
      .get("http://localhost:3000/supervisors/internal")
      .then((response) => {
        setSupervisors(response.data); // Cập nhật danh sách supervisor
        setLoading(false); // Đặt lại loading thành false khi nhận dữ liệu
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Đặt lại loading thành false khi có lỗi
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (supervisors.length === 0) {
    return <p>No supervisors found.</p>;
  }

  // Hàm xử lý khi click vào một học sinh
  const handleRowClick = (supervisorId, studentId) => {
    navigate('/admin-dashboard/user-manager-student-detail/${supervisorId}/${studentId}');
  };
return (
    <div className="user-manager-supervisor">
      {supervisors.map((supervisor) => (
        <div key={supervisor.id} className="supervisor-card">
          <div className="supervisor-details">
            <div className="supervisor-info">
              <h3>{supervisor.name}</h3>
              <p>Unit: {supervisor.work_unit}</p>
              <p>Email: {supervisor.email}</p>
              <p>Phone: {supervisor.phone_number}</p>
            </div>
          </div>
          <div className="students-list">
            <h4>Students:</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Major</th>
                  <th>Topic</th>
                </tr>
              </thead>
              <tbody>
                {supervisor.students && supervisor.students.length > 0 ? (
                  supervisor.students.map((student, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(supervisor.id, student.studentId)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{student.name}</td>
                      <td>{student.studentId}</td>
                      <td>{student.major}</td>
                      <td>{student.topic}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No students assigned</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserManagerSupervisor;