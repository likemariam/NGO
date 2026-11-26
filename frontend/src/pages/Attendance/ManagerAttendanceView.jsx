import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { formatDateTime } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';

function ManagerAttendanceView() {
  const { data, loading, error } = useFetch('/attendance');

  const columns = [
    { key: 'userName', label: 'Name' },
    { key: 'checkInTime', label: 'Check In', render: (r) => formatDateTime(r.checkInTime) },
    { key: 'checkOutTime', label: 'Check Out', render: (r) => r.checkOutTime ? formatDateTime(r.checkOutTime) : '—' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <div className="page">
      <h1>All Attendance</h1>
      <Table columns={columns} data={data} loading={loading} error={error} />
    </div>
  );
}

export default ManagerAttendanceView;
