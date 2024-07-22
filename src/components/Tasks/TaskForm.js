import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/actions/projectActions';
import { createTask } from '../../redux/actions/taskActions';
import { fetchUsers } from '../../redux/actions/userActions';

const TaskForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const projects = useSelector((state) => state.project.projects);
  const token = sessionStorage.getItem('token');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('new');
  const [owner, setOwner] = useState('');
  const [project, setProject] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ name, description, dueDate, status, owner, project }))
      .then(() => {
        setName('');
        setDescription('');
        setDueDate('');
        setStatus('new');
        setOwner('');
        setProject('');
        setSnackbarOpen(true);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Owner</InputLabel>
                <Select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  required
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Task created successfully
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default TaskForm;
