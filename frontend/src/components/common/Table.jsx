import React from 'react';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function Table({ columns, data, loading, error, emptyMessage = 'No records found' }) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!data || data.length === 0) {
    return <p className="empty-text">{emptyMessage}</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id ?? i}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
