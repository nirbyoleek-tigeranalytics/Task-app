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
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      const { token, role } = res.data; // Extract token and role from response
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      setRole(role); // Set role for greeting message
      setOpenSnackbar(true); // Show greeting snackbar

      // Redirect to appropriate page after a short delay
      setTimeout(() => {
        window.location.href = role === 'User' ? '/dashboard' : '/projects';
      }, 1000); // Delay to allow snackbar to be displayed

    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
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
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: '1.2rem' }}>
          Hello {role}!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
