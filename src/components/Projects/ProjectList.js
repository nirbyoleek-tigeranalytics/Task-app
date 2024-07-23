import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, fetchProjects, updateProject } from '../../redux/actions/projectActions';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (project) => {
    setCurrentProject(project);
    setOpenDeleteDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentProject(null);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setCurrentProject(null);
  };

  const handleSave = () => {
    dispatch(updateProject(currentProject));
    handleEditClose();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProject(currentProject._id));
    handleDeleteClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  if (!projects) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {projects.length === 0 ? (
        <Typography variant="body1">No projects found.</Typography>
      ) : (
        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}> {/* Set a fixed height and enable scrolling */}
          {projects.map(project => (
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
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEditClick(project)}>Edit</Button>
                <Button size="small" onClick={() => handleDeleteClick(project)}>Delete</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Project Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            name="name"
            value={currentProject?.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentProject?.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentProject?.startDate ? currentProject.startDate.split('T')[0] : ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentProject?.endDate ? currentProject.endDate.split('T')[0] : ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "{currentProject?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectList;
