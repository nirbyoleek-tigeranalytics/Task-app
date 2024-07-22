import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
      window.location.href = role === 'User' ? '/dashboard' : '/projects';

    } catch (error) {
      console.error('Login error:', error.message);
    }
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
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
