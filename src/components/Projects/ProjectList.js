import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/actions/projectActions';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id}>
          <ListItemText primary={project.name} secondary={project.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default ProjectList;
