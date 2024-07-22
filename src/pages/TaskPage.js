import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';

const TaskPage = () => {
  return (
    <Grid container spacing={3}>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h3" component="h3" gutterBottom>
            Create New Task
          </Typography>
          <TaskForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h3" component="h3" gutterBottom>
            Task List
          </Typography>
          <TaskList />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskPage;
