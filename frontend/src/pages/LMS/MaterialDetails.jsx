import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { formatDate } from '../../utils/formatDate';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function MaterialDetails() {
  const { id } = useParams();
  const { data: material, loading, error } = useFetch(`/materials/${id}`);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!material) return null;

  return (
    <div className="page">
      <Link to="/lms/materials">← Back to materials</Link>
      <h1>{material.title}</h1>
      <p className="meta">{material.fileType?.toUpperCase()} · Uploaded {formatDate(material.createdAt)} by {material.uploadedByName}</p>
      <p>{material.description}</p>
      <a href={`/api/materials/${id}/download`} className="btn btn-primary" download>
        Download File
      </a>
    </div>
  );
}

export default MaterialDetails;
