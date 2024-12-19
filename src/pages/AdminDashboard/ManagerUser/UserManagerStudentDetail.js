import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserManagerStudentDetail.css";

function UserManagerStudentDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const dummyData = [
    { id: 1, name: "Nguyen A", dob: "2000-01-01", major: "Computer Science", unit: "Company", year: "2020", location: "Hanoi", phone: "0123456789", topic: "AI", valid: "valid" },
    { id: 2, name: "Tran B", dob: "1999-02-02", major: "Mechanical Engineering", unit: "Lab", year: "2021", location: "HCM", phone: "0987654321", topic: "Robotics", valid: "valid" },
    { id: 3, name: "Le C", dob: "1998-03-03", major: "Electrical Engineering", unit: "Company", year: "2020", location: "Hanoi", phone: "0112233445", topic: "Power Systems", valid: "valid" },
  ];

  
  const student = dummyData.find((student) => student.id.toString() === id);

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="user-manager-student-detail">
      <div className="student-detail-card">
        <div className="student-photo">
          <img
            src={`https://via.placeholder.com/150?text=${student.name.split(" ")[0]}`}
            alt={student.name}
          />
        </div>
        <div className="student-info">
          <h2>{student.name}</h2>
          <p><strong>Date of Birth:</strong> {student.dob}</p>
          <p><strong>Major:</strong> {student.major}</p>
          <p><strong>Unit:</strong> {student.unit}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Location:</strong> {student.location}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Topic:</strong> {student.topic}</p>
          <p><strong>Validation:</strong> {student.valid}</p>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default UserManagerStudentDetail;
