import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/actions/taskActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.description} secondary={`Due: ${task.dueDate}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
