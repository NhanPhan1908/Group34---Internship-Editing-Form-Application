import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Setting.css";

function Setting() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isScreenOpen, setScreenOpen] = useState(false);

  const userId = "123"; 


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        setUserInfo(response.data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);
  const toggleHelp = () => setHelpOpen(!isHelpOpen);
  const toggleScreen = () => setScreenOpen(!isScreenOpen);

  if (loading) return <div>Đang tải thông tin...</div>;
  if (error) return <div>{error}</div>;

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
          <p><strong>Mã sinh viên:</strong> {userInfo.studentId}</p>
          <p><strong>Khoa:</strong> {userInfo.department}</p>
          <p><strong>Ngành:</strong> {userInfo.course}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Số điện thoại:</strong> {userInfo.phone}</p>
          <button onClick={() => navigate("/student-dashboard/setting/update-info")}>
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
          <button onClick={() => navigate("/")}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
