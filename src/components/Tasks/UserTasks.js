import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTasks, updateTaskStatus } from '../../redux/actions/taskActions';

const UserTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const token = sessionStorage.getItem('token');

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity,setSnackbarSeverity]  = useState('success');

  useEffect(() => {
    dispatch(fetchUserTasks(token));
  }, [dispatch, token]);

  const handleStatusChange = (taskId, event) => {
    const status = event.target.value;
    dispatch(updateTaskStatus(taskId, status, token))
      .then(() => {
        setSnackbarMessage('Task status updated successfully');
        setSnackbarSeverity('success');  // Set severity to 'success' for green color
        setOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Failed to update task status');
        setSnackbarSeverity('error');  // Set severity to 'error' for red color
        setOpen(true);
      });
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Tasks
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={task.status}
                        onChange={(event) => handleStatusChange(task._id, event)}
                      >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="in-progress">In-Progress</MenuItem>
                        <MenuItem value="blocked">Blocked</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="not started">Not Started</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={handleClose}
>
  <MuiAlert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </MuiAlert>
</Snackbar>
    </Container>
  );
};

export default UserTasks;
