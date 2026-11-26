import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { formatDate } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';

function FieldWorkerActivities() {
  const { data: projects, loading } = useFetch('/projects');

  const columns = [
    { key: 'name', label: 'Project' },
    { key: 'status', label: 'Status' },
    { key: 'startDate', label: 'Start', render: (r) => formatDate(r.startDate) },
    { key: 'endDate', label: 'End', render: (r) => formatDate(r.endDate) },
    { key: 'description', label: 'Description' },
  ];

  return (
    <div className="page">
      <h1>My Activities</h1>
      <Table columns={columns} data={projects} loading={loading} />
    </div>
  );
}

export default FieldWorkerActivities;
