import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { formatDateTime } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';

function QuizResults() {
  const { id } = useParams();
  const { data: results, loading, error } = useFetch(`/quizzes/${id}/results`);

  const columns = [
    { key: 'userName', label: 'Name' },
    { key: 'score', label: 'Score', render: (r) => `${r.score} / ${r.totalQuestions}` },
    { key: 'submittedAt', label: 'Submitted', render: (r) => formatDateTime(r.submittedAt) },
  ];

  return (
    <div className="page">
      <h1>Quiz Results</h1>
      <Table columns={columns} data={results} loading={loading} error={error} />
    </div>
  );
}

export default QuizResults;
