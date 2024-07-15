import React from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';

const TaskPage = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskPage;
