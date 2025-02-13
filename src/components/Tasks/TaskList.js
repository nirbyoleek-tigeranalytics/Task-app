import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/actions/projectActions';
import { deleteTask, fetchTasks, updateTask } from '../../redux/actions/taskActions';
import { fetchUsers } from '../../redux/actions/userActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const users = useSelector((state) => state.user.users);
  const projects = useSelector((state) => state.project.projects);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState('');
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState('');
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState('');
  const [updatedTaskOwner, setUpdatedTaskOwner] = useState('');
  const [updatedTaskProject, setUpdatedTaskProject] = useState('');
  const [updatedTaskDueDate, setUpdatedTaskDueDate] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  const statusOptions = ['new', 'in-progress', 'blocked', 'completed', 'not started'];

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const completedTasksList = tasks.filter((task) => task.status === 'completed');
    if (completedTasksList.length > 0) {
      setCompletedTasks(completedTasksList);
      setOpenCompletedDialog(true);
    }
  }, [tasks]);

  const userOptions = users.filter(user => user.role === 'User');

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setUpdatedTaskName(task?.name || '');
    setUpdatedTaskDescription(task?.description || '');
    setUpdatedTaskStatus(task?.status || '');
    setUpdatedTaskOwner(task?.owner ? task.owner._id : '');
    setUpdatedTaskProject(task?.project ? task.project._id : '');
    setUpdatedTaskDueDate(formatDate(task?.dueDate) || '');
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (task) => {
    setCurrentTask(task);
    setOpenDeleteDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentTask(null);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setCurrentTask(null);
  };

  const handleCompletedDialogClose = () => {
    setOpenCompletedDialog(false);
  };

  const handleUpdateTask = () => {
    if (currentTask) {
      dispatch(updateTask({
        ...currentTask,
        name: updatedTaskName,
        description: updatedTaskDescription,
        status: updatedTaskStatus,
        owner: updatedTaskOwner,
        project: updatedTaskProject,
        dueDate: updatedTaskDueDate,
      }));
      setOpenEditDialog(false);
      setCurrentTask(null);
      window.location.reload();
    }
  };

  const handleConfirmDelete = () => {
    if (currentTask) {
      dispatch(deleteTask(currentTask._id));
      setOpenDeleteDialog(false);
      setCurrentTask(null);
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks found.</Typography>
      ) : (
        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {tasks.map((task) => {
            const backgroundColor = task.status === 'completed' ? '#d4edda' : 'transparent';

            return (
              task && (
                <Card key={task.id} variant="outlined" sx={{ mb: 2, backgroundColor }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {task.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Description: {task.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Owner: {task.owner?.username || 'No Owner'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Project: {task.project?.name || 'No Project'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Due Date: {task.dueDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Status: {task.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleEditClick(task)} fullWidth color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(task)} fullWidth color="error">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              )
            );
          })}
        </div>
      )}

      {/* Edit Task Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            name="name"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Task Description"
            name="description"
            value={updatedTaskDescription}
            onChange={(e) => setUpdatedTaskDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={updatedTaskStatus}
              onChange={(e) => setUpdatedTaskStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={updatedTaskDueDate}
            onChange={(e) => setUpdatedTaskDueDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Owner</InputLabel>
            <Select
              value={updatedTaskOwner}
              onChange={(e) => setUpdatedTaskOwner(e.target.value)}
            >
              {userOptions.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Project</InputLabel>
            <Select
              value={updatedTaskProject}
              onChange={(e) => setUpdatedTaskProject(e.target.value)}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdateTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{currentTask?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Completed Tasks Dialog */}
      <Dialog open={openCompletedDialog} onClose={handleCompletedDialogClose}>
        <DialogTitle>Completed Tasks Status</DialogTitle>
        <DialogContent>
          {completedTasks.map((task) => (
            <DialogContentText key={task._id} color="green">
              Task {task.name} has been marked as completed by {task.owner?.username || 'Unknown'}.
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCompletedDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
