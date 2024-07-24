import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../redux/actions/userActions';

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  const roles = ['Admin', 'User','Task Manager'];

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const selectedUserData = users.find(user => user.username === selectedUser);
    
    if (selectedUserData) {
      const userDataToUpdate = {
        _id: selectedUserData._id,
        username: selectedUserData.username,
        email: selectedUserData.email,
        role: selectedRole,
      };
      
      dispatch(updateUser(userDataToUpdate, token))
        .then(() => {
          setSnackbarMessage('Role updated successfully!');
          setOpenSnackbar(true);
          setSelectedUser('');
          setSelectedRole('');
        })
        .catch((error) => {
          setSnackbarMessage('Failed to update role.');
          setOpenSnackbar(true);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom mb={4}>
          Manage Users
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>User</InputLabel>
                <Select
                  value={selectedUser}
                  onChange={handleUserChange}
                  fullWidth
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user.username}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Role
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserPage;
