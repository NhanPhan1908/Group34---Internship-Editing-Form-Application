import React, { useState } from "react";
import axios from "axios";
import "./UpdateInfo.css";

function UpdateInfo() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    date_of_birth: "",
    major: "",
    year: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post("http://localhost:3000/update-student-info", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Cập nhật thành công!");
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-info-container">
      <h1>Cập nhật thông tin</h1>
      {error && <p className="error">{error}</p>}
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
