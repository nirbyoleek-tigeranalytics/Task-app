import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; 

export const fetchTasks = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseURL}/tasks`, config);
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${baseURL}/tasks`, task, config);
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${baseURL}/tasks/${task._id}`, task,config);
    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${baseURL}/tasks/${id}`, config);
    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_TASK_FAILURE', payload: error.message });
  }
};
