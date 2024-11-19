import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

function Setting() {
  const navigate = useNavigate();
  
  const userInfo = {
    name: "Chưa cập nhật",
    dob: "Chưa cập nhật",
    studentId: "Chưa cập nhật",
    department: "Chưa cập nhật",
    course: "Chưa cập nhật",
    email: "example@example.com", 
    phone: "Chưa cập nhật",
    avatar: "https://via.placeholder.com/150", // Thêm avatar giả
  };

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isScreenOpen, setScreenOpen] = useState(false);

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);
  const toggleHelp = () => setHelpOpen(!isHelpOpen);
  const toggleScreen = () => setScreenOpen(!isScreenOpen);

  return (
    <div className="setting-container">
      <h1>Cài đặt</h1>

      
      <div className="user-info">
        <div className="avatar-container">
          <img src={userInfo.avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="info">
          <h2>{userInfo.name}</h2>
          <p><strong>Ngày sinh:</strong> {userInfo.dob}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <button onClick={() => navigate("/dashboard/setting/update-info")}>
            Cập nhật thông tin
          </button>
        </div>
      </div>

      
      <div className="system-settings">
        <div className="setting-item">
          <button onClick={toggleSettings}>Cài đặt</button>
          {isSettingsOpen && (
            <div className="dropdown">
              <p>Cài đặt hệ thống</p>
              <p>Ngôn ngữ</p>
            </div>
          )}
        </div>

        <div className="setting-item">
          <button onClick={toggleHelp}>Trợ giúp</button>
          {isHelpOpen && (
            <div className="dropdown">
              <p>Trung tâm trợ giúp</p>
              <p>Báo cáo</p>
            </div>
          )}
        </div>

        <div className="setting-item">
          <button onClick={toggleScreen}>Màn hình</button>
          {isScreenOpen && (
            <div className="dropdown">
              <p>Chế độ tối</p>
              <p>Bàn phím</p>
            </div>
          )}
        </div>

        <div className="setting-item">
          <button onClick={() => navigate("/logout")}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
