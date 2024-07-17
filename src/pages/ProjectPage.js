import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import ProjectForm from '../components/Projects/ProjectForm';
import ProjectList from '../components/Projects/ProjectList';

const ProjectPage = () => {
  return (
    <Grid container spacing={3}>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h3" component="h3" gutterBottom>
            Create New Project
          </Typography>
          <ProjectForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h3" component="h3" gutterBottom>
            Project List
          </Typography>
          <ProjectList />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
