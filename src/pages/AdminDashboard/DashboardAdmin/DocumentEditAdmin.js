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
          licenseKey: 'demo:1734054200595:7ed0e28503000000005ad9044c604af8d4016a91e6803d0563bcaed963'
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

  useEffect(() => {
    if (uploadedFile && instanceRef.current) {
      
      const { documentViewer } = instanceRef.current.Core;
      if (documentViewer) {
        documentViewer.loadDocument(uploadedFile);
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
      <button onClick={handleUploadButtonClick}>
        Upload PDF
      </button>
    </div>
  );
};

export default DocumentEditAdmin;
