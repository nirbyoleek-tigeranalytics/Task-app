import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../../redux/actions/projectActions';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ name, description }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create Project
      </Button>
    </form>
  );
};

export default ProjectForm;
