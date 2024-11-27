
import React from 'react';

const StatisticsPage = () => {
  return (
    <div className="statistics-page">
      <h1>Thống kê</h1>
      <div className="statistics-content">
        <p>Thông tin thống kê chi tiết sẽ được hiển thị tại đây.</p>
        <div className="stats-card">
          <h3>Số lượng sinh viên</h3>
          <p>200 sinh viên</p>
        </div>
        <div className="stats-card">
          <h3>Số lượng giảng viên</h3>
          <p>50 giảng viên</p>
        </div>
        {/* Bạn có thể thêm các phần thống kê khác, như biểu đồ, bảng thống kê, v.v. */}
      </div>
    </div>
  );
};

export default StatisticsPage;
