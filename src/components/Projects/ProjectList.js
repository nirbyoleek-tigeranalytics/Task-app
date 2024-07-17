import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/actions/projectActions';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (!projects) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {projects.length === 0 ? (
        <Typography variant="body1">No projects found.</Typography>
      ) : (
        projects.map(project => (
          <Card key={project._id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Description: {project.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Start Date: {new Date(project.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                End Date: {new Date(project.endDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Owner: {project.owner}
              </Typography>
              {/* Additional project details can be added here */}
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProjectList;
