import React from 'react';
import './InternalSupervisorDetail.css';

function InternalSupervisorDetail() {
  return (
    <div className="internal-supervisor-detail">
      <h2>Chi tiết thông tin giám sát viên nội bộ</h2>
      <p><strong>Tên:</strong> ThS. Nguyễn Văn B</p>
      <p><strong>Đơn vị công tác:</strong> Khoa Công nghệ thông tin</p>
      <p><strong>Email:</strong> nguyenvanb@example.com</p>
      <p><strong>Điện thoại:</strong> 0123456789</p>

      <h3>Giấy tờ liên quan</h3>
      <ul>
        <li><a href="/path/to/document1.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 1</a></li>
        <li><a href="/path/to/document2.pdf" target="_blank" rel="noopener noreferrer">Giấy tờ 2</a></li>
      </ul>
    </div>
  );
}

export default InternalSupervisorDetail;
