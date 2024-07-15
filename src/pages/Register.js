import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Assuming your backend handles registration and returns a success message or user data
      console.log('Registration successful:', res.data);

      // Optionally, you can redirect to login page after successful registration
      window.location.href = '/login'; // Replace with your desired redirect path
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Register
        </Button>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Container>
  );
};

export default Register;
