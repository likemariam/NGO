import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function MaterialCard({ material }) {
  const icons = { PDF: '📄', VIDEO: '🎬', DOCUMENT: '📝' };

  return (
    <div className="card material-card">
      <div className="card-icon">{icons[material.fileType] || '📁'}</div>
      <div className="card-body">
        <h3>{material.title}</h3>
        <p className="meta">{material.fileType} · {formatDate(material.createdAt)}</p>
        <p>{material.description}</p>
        <Link to={`/lms/materials/${material.id}`} className="btn btn-secondary btn-sm">View</Link>
      </div>
    </div>
  );
}

export default MaterialCard;
