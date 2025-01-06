import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import './DocumentEditAdmin.css';

const DocumentEditAdmin = () => {
  const viewer = useRef(null);
  const instanceRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadButtonClick = () => {
    if (viewer.current && !instanceRef.current) {
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: '/files/template.pdf',
          licenseKey: 'demo:1734054200595:7ed0e28503000000005ad9044c604af8d4016a91e6803d0563bcaed963',
        },
        viewer.current
      ).then((instance) => {
        instanceRef.current = instance;
      });
    }
    document.getElementById('file-upload-input').click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUploadedFile(fileUrl);
    }
  };

  const validateFormData = () => {
    const { annotationManager } = instanceRef.current.Core;
    const fields = annotationManager.getFieldManager().getFields();

    fields.forEach((field) => {
      // Kiểm tra trường checkbox
      if (field.flags && field.flags.includes('Checkbox')) {
        const isChecked = field.getValue();
        console.log(`Checkbox "${field.name}" được chọn: ${isChecked}`);
        if (!isChecked) {
          alert(`Hộp kiểm "${field.name}" chưa được chọn!`);
        }
      }

      // Kiểm tra trường text
      if (field.name === 'TextField1' && field.getValue() === '') {
        alert('Trường "TextField1" không được để trống!');
      }
    });
  };

  const resetForm = () => {
    const { annotationManager } = instanceRef.current.Core;
    const fieldManager = annotationManager.getFieldManager();
    fieldManager.reset();
  };

  const createFormField = () => {
    const { Annotations, documentViewer } = instanceRef.current.Core;

    documentViewer.addEventListener('documentLoaded', () => {
      const annotationManager = documentViewer.getAnnotationManager();
      const fieldManager = annotationManager.getFieldManager();

      // Tạo trường form text
      const textField = new Annotations.Forms.Field('TextField1', { type: 'Tx' });
      const textWidget = new Annotations.TextWidgetAnnotation(textField);
      textWidget.PageNumber = 1;
      textWidget.X = 100;
      textWidget.Y = 500;
      textWidget.Width = 200;
      textWidget.Height = 30;

      // Tạo checkbox
      const checkboxField = new Annotations.Forms.Field('Checkbox1', { type: 'Btn' });
      const checkboxWidget = new Annotations.CheckButtonWidgetAnnotation(checkboxField);
      checkboxWidget.PageNumber = 1;
      checkboxWidget.X = 100;
      checkboxWidget.Y = 450;
      checkboxWidget.Width = 20;
      checkboxWidget.Height = 20;

      // Thêm các trường vào trang
      fieldManager.addField(textField);
      fieldManager.addField(checkboxField);

      annotationManager.addAnnotation(textWidget);
      annotationManager.addAnnotation(checkboxWidget);

      annotationManager.redrawAnnotation(textWidget);
      annotationManager.redrawAnnotation(checkboxWidget);
    });
  };

  useEffect(() => {
    if (uploadedFile && instanceRef.current) {
      const { documentViewer } = instanceRef.current.Core;
      if (documentViewer) {
        documentViewer.loadDocument(uploadedFile);
        createFormField();
      }
    }
  }, [uploadedFile]);

  return (
    <div className='document-edit-admin'>
      <div className='header'>Document Edit - Admin</div>
      <div className='webviewer-container' ref={viewer}></div>
      <input
        id="file-upload-input"
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <button onClick={handleUploadButtonClick}>Upload PDF</button>
      <button onClick={validateFormData}>Kiểm tra dữ liệu</button>
      <button onClick={resetForm}>Đặt lại form</button>
    </div>
  );
};

export default DocumentEditAdmin;
