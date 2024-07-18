// UserPage.js

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../redux/actions/userActions';

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); // Assuming your Redux state structure has a 'user' slice with 'users' array

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchUsers(token)); // Fetch users when component mounts
  }, [dispatch, token]);

  const roles = ['Admin', 'User']; // Replace with actual roles from your application

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Find the selected user from the users array
    const selectedUserData = users.find(user => user.username === selectedUser);
    
    if (selectedUserData) {
      // Prepare the data to be sent to the API
      const userDataToUpdate = {
        _id: selectedUserData._id,
        username: selectedUserData.username,
        email: selectedUserData.email,
        role: selectedRole,
        
      };
      
      // Dispatch action to update user
      dispatch(updateUser(userDataToUpdate, token)); 
      
      // Clear selected values after update
      setSelectedUser('');
      setSelectedRole('');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
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
        <FormControl fullWidth margin="normal">
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
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Update Role
        </Button>
      </form>
    </div>
  );
};

export default UserPage;
