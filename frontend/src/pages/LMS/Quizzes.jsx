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

function Quizzes() {
  const { data: quizzes, loading, error } = useFetch('/quizzes');
  const { user } = useAuth();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Quizzes</h1>
        {can.createQuiz(user?.role) && (
          <Link to="/lms/quizzes/create"><Button variant="primary">+ Create Quiz</Button></Link>
        )}
      </div>
      {!quizzes?.length ? (
        <p className="empty-text">No quizzes available yet.</p>
      ) : (
        <div className="materials-grid">
          {quizzes.map((q) => (
            <Card
              key={q.id}
              title={q.title}
              actions={
                <div>
                  <Link to={`/lms/quizzes/take/${q.id}`} className="btn btn-primary btn-sm">Take Quiz</Link>
                  {can.createQuiz(user?.role) && (
                    <Link to={`/lms/quizzes/results/${q.id}`} className="btn btn-secondary btn-sm">Results</Link>
                  )}
                </div>
              }
            >
              <p>{q.description}</p>
              <p className="meta">{q.questions?.length ?? 0} questions · {formatDate(q.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quizzes;
