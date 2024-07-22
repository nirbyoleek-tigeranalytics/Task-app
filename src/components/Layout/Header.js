import { Alert, AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogout = () => {
    setOpenDialog(true); // Open confirmation dialog
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setOpenDialog(false);
    setOpenSnackbar(true); // Show snackbar after logout
    setTimeout(() => {
      window.location.href = '/login'; // Redirect to login page
    }, 1000); // Delay to allow snackbar to be displayed
  };

  const handleCancelLogout = () => {
    setOpenDialog(false); // Close confirmation dialog
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close snackbar
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Tracker App
          </Typography>
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

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
