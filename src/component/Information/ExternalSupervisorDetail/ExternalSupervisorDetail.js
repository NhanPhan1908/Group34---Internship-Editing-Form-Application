import React from 'react';
import './ExternalSupervisorDetail.css';

function ExternalSupervisorDetail() {
  return (
    <div className="external-supervisor-detail">
      <h2>Chi tiết thông tin giám sát viên ngoại bộ</h2>
      <p><strong>Tên:</strong> Ông John Doe</p>
      <p><strong>Đơn vị công tác:</strong> Công ty XYZ</p>
      <p><strong>Email:</strong> johndoe@company.com</p>
      <p><strong>Chức vụ:</strong> Giám đốc</p>
      <p><strong>Số điện thoại:</strong> 0987654321</p>

      <h3>Giấy tờ liên quan</h3>
      <ul>
        <li><a href="/path/to/document1.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 1</a></li>
        <li><a href="/path/to/document2.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 2</a></li>
      </ul>
    </div>
  );
}

export default ExternalSupervisorDetail;
