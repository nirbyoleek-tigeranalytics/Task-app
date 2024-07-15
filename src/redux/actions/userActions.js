import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users');
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users', user);
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/users/${user.id}`, user);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${id}`);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
  }
};
