import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import { can } from '../../utils/permissions';
import { formatDate } from '../../utils/formatDate';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function LearningMaterials() {
  const { data: materials, loading, error } = useFetch('/materials');
  const { user } = useAuth();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Learning Materials</h1>
        {can.uploadMaterial(user?.role) && (
          <Link to="/lms/materials/upload">
            <Button variant="primary">+ Upload Material</Button>
          </Link>
        )}
      </div>

      {!materials?.length ? (
        <p className="empty-text">No materials available yet.</p>
      ) : (
        <div className="materials-grid">
          {materials.map((m) => (
            <Card
              key={m.id}
              title={m.title}
              actions={<Link to={`/lms/materials/${m.id}`}>View</Link>}
            >
              <p className="meta">{m.fileType.toUpperCase()} · {formatDate(m.createdAt)}</p>
              <p>{m.description}</p>
              <p className="meta">By {m.uploadedByName}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearningMaterials;
