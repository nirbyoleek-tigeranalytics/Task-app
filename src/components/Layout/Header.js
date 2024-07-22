import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    window.location.href = '/login'; // Redirect to login page using window.location
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Tracker App
        </Typography>
        {!isAdmin && (
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        )}
        {isAdmin && (
          <>
            <Button color="inherit" component={Link} to="/projects">
              Projects
            </Button>
            <Button color="inherit" component={Link} to="/tasks">
              Tasks
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
