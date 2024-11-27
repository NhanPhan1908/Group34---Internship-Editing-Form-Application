import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "./DocumentEdit.css";



pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

function DocumentEdit() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    birthDate: "",
    faculty: "",
  });

 
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Vui lòng chọn file PDF hợp lệ!");
    }
  };

  
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="document-edit">
      
      <div className="main-content">
        

        
        <div className="content">
          <h1>Chỉnh sửa tài liệu PDF</h1>

          
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ marginBottom: "20px" }}
          />

          
          {file && (
            <div className="pdf-container">
              <Document file={file} onLoadSuccess={onLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={index} pageNumber={index + 1} renderMode="canvas" />
                ))}
              </Document>
            </div>
          )}

          
          <div className="form-container">
            <h2>Thông tin cá nhân</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Họ và tên:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentId">Mã sinh viên:</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleFormChange}
                  placeholder="Nhập mã sinh viên"
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate">Ngày sinh:</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="faculty">Khoa:</label>
                <input
                  type="text"
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleFormChange}
                  placeholder="Nhập khoa"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentEdit;
