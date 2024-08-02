import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [role, setRole] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://ec2-13-201-187-156.ap-south-1.compute.amazonaws.com/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      const { token, role } = res.data; 
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      setRole(role); 
      setSnackbarMessage(`Hello ${role}!`); 
      setSnackbarSeverity('success'); 
      setOpenSnackbar(true); 

      setTimeout(() => {
        if (role === 'User') {
          window.location.href = '/dashboard';
        } else if (role === 'Admin') {
          window.location.href = '/projects';
        } else if (role === 'Task Manager') {
          window.location.href = '/tasks';
        }
      }, 1000);
      

    } catch (error) {
      console.error('Login error:', error.message);
      setSnackbarMessage('Login failed: Incorrect email or password'); 
      setSnackbarSeverity('error'); 
      setOpenSnackbar(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '120px' }} align="center">
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }} 
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }} 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        sx={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '80%', 
          maxWidth: '600px' 
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', fontSize: '1.2rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
