import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Tracker App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/roles">
          Roles
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
