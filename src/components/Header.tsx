import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  let pageTitle = 'Welcome';
  const path = location.pathname;
  if (path === '/') pageTitle = 'Home';
  else if (path.startsWith('/table')) pageTitle = 'User Table';
  else if (path.startsWith('/add-user')) pageTitle = 'Add User';
  else if (path.startsWith('/settings')) pageTitle = 'Settings';
  else if (path.startsWith('/dag')) pageTitle = 'Directed Acyclic Graphs';
  else if (path.startsWith('/timeline')) pageTitle = 'Timeline Chart';
  else if (path.startsWith('/timeseries')) pageTitle = 'Time Series Chart';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-bar">
      <div className="header-left">
        <h1>{pageTitle}</h1>
      </div>

      <div className="header-actions" ref={ref}>
        <FiLogOut className="header-icon" title="Logout" onClick={() => setShowDropdown(v => !v)} />
        {showDropdown && (
          <div className="logout-dropdown">
            <p>Are you sure you want to logout?</p>
            <div className="logout-options">
              <button onClick={handleLogout} className="confirm-btn">Yes</button>
              <button onClick={() => setShowDropdown(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;