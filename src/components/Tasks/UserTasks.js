import {
  Alert,
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTasks, updateTaskStatus } from '../../redux/actions/taskActions';

const UserTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchUserTasks(token));
  }, [dispatch, token]);

  const handleStatusChange = (taskId, event) => {
    const status = event.target.value;
    dispatch(updateTaskStatus(taskId, status, token))
      .then(() => {
        setSnackbarMessage('Task updated successfully');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        setSnackbarMessage('Error updating task');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
           Tasks Assigned
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.project.name}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
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

      {/* Snackbar for task update confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserTasks;
