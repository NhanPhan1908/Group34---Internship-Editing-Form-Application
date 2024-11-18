import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard/contract">Hợp đồng thực tập</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/progress-report">Báo cáo tiến độ</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/evaluation">Đánh giá</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/internship-permission">Giấy phép thực tập</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/transcript">Bảng điểm</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/attendance">Danh sách tham gia</Link>
      </div>
      <div className="sidebar-item">
        <Link to="/dashboard/report">Báo cáo tổng kết</Link>
      </div>
    </div>
  );
}

export default Sidebar;
