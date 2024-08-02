import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTasks, updateTaskStatus } from '../../redux/actions/taskActions';

const UserTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dueSoonTasks, setDueSoonTasks] = useState([]);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchUserTasks(token));
  }, [dispatch, token]);

  useEffect(() => {
    const dueSoon = tasks.filter((task) => calculateDueInDays(task.dueDate) < 5 && calculateDueInDays(task.dueDate) >= 0);
    if (dueSoon.length > 0) {
      setDueSoonTasks(dueSoon);
      setOpenDialog(true);
    }
  }, [tasks]);

  const handleStatusChange = (taskId, event) => {
    const status = event.target.value;
    dispatch(updateTaskStatus(taskId, status, token))
      .then(() => {
        setSnackbarMessage('Task updated successfully');
        setOpenSnackbar(true);
        setTimeout(() => window.location.reload(), 1000);
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const calculateDueInDays = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
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
                <TableCell>Due In</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                const dueInDays = calculateDueInDays(task.dueDate);
                const isOverdue = dueInDays < 0;
                const dueDateStyle = { color: isOverdue ? 'red' : dueInDays < 5 ? 'red' : 'inherit' };
                const backgroundColor = task.status === 'completed' ? '#d4edda' : isOverdue ? '#FFCCCC' : 'transparent';

                const dueDateText = isOverdue ? 'Overdue' : `${dueInDays} days`;

                return (
                  <TableRow key={task._id} sx={{ backgroundColor }}>
                    <TableCell >{task.name}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.project.name}</TableCell>
                    <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell style={dueDateStyle}>{dueDateText}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={task.status}
                          onChange={(event) => handleStatusChange(task._id, event)}
                          disabled={isOverdue}
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Task Due Soon</DialogTitle>
        <DialogContent>
          {dueSoonTasks.map((task) => (
            <DialogContentText key={task._id}>
              Task "{task.name}" is due in {calculateDueInDays(task.dueDate)} days.
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserTasks;
