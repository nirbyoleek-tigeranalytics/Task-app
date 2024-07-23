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
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    // const role = 'Task Manager';
    if (role) {
      setUserRole(role);
    } else {
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <div>
      {userRole && (
        <Header isAdmin={userRole === 'Admin'} isTaskManager={userRole === 'Task Manager'} />
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {userRole === 'Admin' && (
            <>
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/" element={<ProjectPage />} /> {/* Default route for Admin */}
            </>
          )}
          {userRole === 'Task Manager' && (
            <>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/" element={<TaskPage />} /> {/* Default route for Task Manager */}
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
