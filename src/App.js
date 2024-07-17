import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProjectPage from './pages/ProjectPage';
import Register from './pages/Register';
import RolePage from './pages/RolePage';
import TaskPage from './pages/TaskPage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/roles" element={<RolePage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </main>
    </div>
  );
};

export default App;
