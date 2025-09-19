import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTable, FaUserPlus, FaCog, FaProjectDiagram, FaRegClock, FaChartLine } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'icon-link active' : 'icon-link';

  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <img src={logo} alt="Company Logo" className="sidebar-logo" />
      </div>

      <div className="top-icons">
        <NavLink to="/" className={linkClass}>
          <FaHome />
        </NavLink>
        <NavLink to="/table" className={linkClass}>
          <FaTable />
        </NavLink>
        <NavLink to="/add-user" className={linkClass}>
          <FaUserPlus />
        </NavLink>

        <NavLink to="/dag" className={linkClass}>
          <FaProjectDiagram />
        </NavLink>
        <NavLink to="/timeline" className={linkClass}>
          <FaRegClock />
        </NavLink>
        <NavLink to="/timeseries" className={linkClass}>
          <FaChartLine />
        </NavLink>
      </div>

      <div className="bottom-icon">
        <NavLink to="/settings" className={linkClass}>
          <FaCog />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;