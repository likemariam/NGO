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

function Questionnaires() {
  const { data: questionnaires, loading, error } = useFetch('/questionnaires');
  const { user } = useAuth();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Questionnaires</h1>
        {can.uploadMaterial(user?.role) && (
          <Link to="/lms/questionnaires/create">
            <Button variant="primary">+ Create</Button>
          </Link>
        )}
      </div>
      {!questionnaires?.length ? (
        <p className="empty-text">No questionnaires yet.</p>
      ) : (
        <div className="materials-grid">
          {questionnaires.map((q) => (
            <Card key={q.id} title={q.title}>
              <p>{q.description}</p>
              <p className="meta">{q.questions?.length ?? 0} questions · {formatDate(q.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Questionnaires;
