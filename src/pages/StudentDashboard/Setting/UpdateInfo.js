import React, { useState } from "react";
import axios from "axios";  // Thêm axios để thực hiện các yêu cầu HTTP
import "./UpdateInfo.css";

function UpdateInfo() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    dob: "",
    studentId: "",
    department: "",
    course: "",
    email: "example@example.com",
    phone: "",
  });

  const [loading, setLoading] = useState(false);  // Thêm state loading để theo dõi quá trình gửi dữ liệu
  const [error, setError] = useState("");  // Thêm state error để hiển thị thông báo lỗi nếu có

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Bắt đầu trạng thái loading khi gửi form

    try {
      const response = await axios.post("http://localhost:3000/api/updateInfo", formData);
      
      if (response.status === 200) {
        alert("Cập nhật thành công!");
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);  // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="update-info-container">
      <h1>Cập nhật thông tin</h1>
      {error && <p className="error">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      <form onSubmit={handleSubmit}>
        <label>Họ và Tên</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        
        <label>Ngày sinh</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        
        <label>Mã sinh viên</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        />
        
        <label>Khoa</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        
        <label>Khóa học</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
        />
        
        <label>Email (không thay đổi)</label>
        <input type="email" name="email" value={formData.email} readOnly />
        
        <label>Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thông tin"}
        </button>
      </form>
    </div>
  );
}

export default UpdateInfo;
