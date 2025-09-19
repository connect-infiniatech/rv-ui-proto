import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserPage: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, role }),
      });
      if (res.ok) {
        alert('User added');
        navigate('/table');
      } else {
        alert('Failed to add');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">➕ Add New User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;