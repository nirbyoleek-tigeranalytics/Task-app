import axios from 'axios';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_TASK_FAILURE', payload: error.message });
  }
};
