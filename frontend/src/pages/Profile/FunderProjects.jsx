import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { formatDate } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';

function FunderProjects() {
  const { data: fundings, loading, error } = useFetch('/projects/my-fundings');

  const columns = [
    { key: 'projectName', label: 'Project' },
    { key: 'amount', label: 'Amount', render: (r) => `$${Number(r.amount).toLocaleString()}` },
    { key: 'fundingDate', label: 'Date', render: (r) => formatDate(r.fundingDate) },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <div className="page">
      <h1>My Funded Projects</h1>
      <Table columns={columns} data={fundings} loading={loading} error={error} />
    </div>
  );
}

export default FunderProjects;
