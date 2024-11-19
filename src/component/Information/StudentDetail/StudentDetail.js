import React from 'react';
import './StudentDetail.css';

function StudentDetail() {
  return (
    <div className="student-detail">
      <h2>Chi tiết thông tin sinh viên</h2>
      <p><strong>Tên:</strong> Nguyễn Văn A</p>
      <p><strong>Ngày sinh:</strong> 01/01/2000</p>
      <p><strong>Khoa:</strong> Công nghệ thông tin</p>
      <p><strong>Ngành:</strong> Phát triển phần mềm</p>
      <p><strong>Số điện thoại:</strong> 0123456789</p>
      <p><strong>Email:</strong> nguyenvana@example.com</p>
      <p><strong>Thời gian thực tập:</strong> 01/06/2024 - 31/08/2024</p>
      <p><strong>Chủ đề thực tập:</strong> Phát triển ứng dụng web</p>

      <h3>Giấy tờ liên quan</h3>
      <ul>
        <li><a href="/path/to/document1.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 1</a></li>
        <li><a href="/path/to/document2.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 2</a></li>
      </ul>
    </div>
  );
}

export default StudentDetail;
