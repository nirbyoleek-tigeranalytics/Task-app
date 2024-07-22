import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectPage from './pages/ProjectPage';
import Register from './pages/Register';
import TaskPage from './pages/TaskPage';
import UserPage from './pages/UserPage';

const App = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate(); // Use the navigate function for redirection

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role) {
      setUserRole(role);
    } else {
      // Ensure that unauthenticated users can access login and register pages
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login'); // Redirect to login if not authenticated and not on login/register pages
      }
    }
  }, [navigate]);

  return (
    <div>
      {userRole && ( 
        <Header isAdmin={userRole === 'Admin'} />
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {userRole === 'Admin' && (
            <>
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/" element={<ProjectPage />} /> {/* Default route for Admin */}
            </>
          )}
          {userRole === 'User' && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          <Route path="/" element={<Login />} /> {/* Default route for non-authenticated users */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
