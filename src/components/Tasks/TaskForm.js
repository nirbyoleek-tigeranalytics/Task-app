import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/actions/taskActions';

const TaskForm = () => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('new');
  const [owner, setOwner] = useState('');
  const [project, setProject] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const projects = useSelector((state) => state.project.projects);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ description, dueDate, status, owner, project }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="not-started">Not Started</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Owner</InputLabel>
        <Select value={owner} onChange={(e) => setOwner(e.target.value)} required>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Project</InputLabel>
        <Select value={project} onChange={(e) => setProject(e.target.value)} required>
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;
