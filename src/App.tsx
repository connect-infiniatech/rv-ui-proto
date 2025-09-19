import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TablePage from './pages/TablePage';
import AddUserPage from './pages/AddUserPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import DAGPage from './pages/DAGPage';
import TimelinePage from './pages/TimelinePage';
import TimeSeriesPage from './pages/TimeSeriesPage';
import ProtectedRoute from './components/ProtectedRoute';

// Import the AuthProvider
import { AuthProvider } from './context/AuthContext';
import './App.css';

const AppLayout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dag" element={<DAGPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/timeseries" element={<TimeSeriesPage />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    // Wrap the entire application with AuthProvider
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* All other pages protected */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;