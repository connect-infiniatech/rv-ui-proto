import React, { useEffect, useState } from 'react';
import DataTable, { type User } from '../components/DataTable';

const TablePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/items')
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then(data => setUsers(data))
      .catch(err => {
        console.error('fetch users err', err);
        setError('Failed to fetch user data.');
        setUsers([]);               // ✅ ensure DataTable sees empty array
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading-container">Loading users...</div>;
  }

  return (
    <div className="page-wrapper">
      {error && <div className="error-banner">{error}</div>}
      <DataTable data={users} />
    </div>
  );
};

export default TablePage;