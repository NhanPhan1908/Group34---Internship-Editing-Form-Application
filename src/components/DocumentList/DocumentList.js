import React from 'react';
import './DocumentList.css';

function DocumentList({ documents = [] }) {
  return (
    <div className="document-list">
      <h2>Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="document-item">
              <span>{doc.name}</span>
              <span className="document-status">{doc.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentList; 