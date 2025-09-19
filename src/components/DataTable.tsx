import React, { useState, type ChangeEvent } from 'react';
import './DataTable.css';

export interface User {
  id: number | string;
  name: string;
  role: string;
  location: string;
}

interface DataTableProps {
  data: User[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const pagesPerGroup = 10;

  const filteredData = data.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const roles = [...new Set(data.map((user) => user.role))];

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNextGroup = () => {
    const nextGroupStartPage = endPage + 1;
    if (nextGroupStartPage <= totalPages) {
      setCurrentPage(nextGroupStartPage);
    }
  };

  const handlePrevGroup = () => {
    const prevGroupStartPage = startPage - pagesPerGroup;
    if (prevGroupStartPage >= 1) {
      setCurrentPage(prevGroupStartPage);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="table-container">
      <div className="table-card">
        <h2 className="table-title">📋 User List</h2>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={roleFilter} onChange={handleRoleChange}>
            <option value="">All Roles</option>
            {roles.map((role, idx) => (
              <option key={idx} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Table wrapped in scroll container */}
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={4}>No data found</td>
                </tr>
              ) : (
                currentData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePrevGroup} disabled={startPage === 1}>
              &lt;&lt;
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>

            <button onClick={handleNextGroup} disabled={endPage >= totalPages}>
              &gt;&gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;