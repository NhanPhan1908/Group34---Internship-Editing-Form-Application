import React from 'react';
import './CompanyDetail.css';

function CompanyDetail() {
  return (
    <div className="company-detail">
      <h2>Chi tiết thông tin công ty</h2>
      <p><strong>Tên công ty:</strong> Công ty ABC</p>
      <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
      <p><strong>Email:</strong> contact@abc.com</p>
      <p><strong>Số điện thoại:</strong> 0987654321</p>

      <h3>Giấy tờ liên quan</h3>
      <ul>
        <li><a href="/path/to/document1.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 1</a></li>
        <li><a href="/path/to/document2.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 2</a></li>
      </ul>
    </div>
  );
}

export default CompanyDetail;
