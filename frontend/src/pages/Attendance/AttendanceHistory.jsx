import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { formatDateTime } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';

function AttendanceHistory() {
  const { data, loading, error } = useFetch('/attendance/my-history');

  const columns = [
    { key: 'checkInTime', label: 'Check In', render: (r) => formatDateTime(r.checkInTime) },
    { key: 'checkOutTime', label: 'Check Out', render: (r) => r.checkOutTime ? formatDateTime(r.checkOutTime) : '—' },
    { key: 'location', label: 'Location' },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <div className="page">
      <h1>My Attendance History</h1>
      <Table columns={columns} data={data} loading={loading} error={error} />
    </div>
  );
}

export default AttendanceHistory;
