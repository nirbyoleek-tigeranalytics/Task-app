import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectPage from './pages/ProjectPage';
import Register from './pages/Register';
import TaskPage from './pages/TaskPage';
import UserPage from './pages/UserPage';

const App = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
  
    const role = 'Admin';
    setUserRole(role);
  }, []);

  return (
    <div>
      {userRole === 'Admin' && (
        <Header isAdmin={true} />
      )}
      {userRole === 'User' && (
        <Header isAdmin={false} />
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

            </>
          )}
          {userRole === 'User' && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
