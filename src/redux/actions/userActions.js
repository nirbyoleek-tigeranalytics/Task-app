import axios from 'axios';

// Fetch users action with token
export const fetchUsers = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

// Create user action with token
export const createUser = (user, token) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
  }
};

// Update user action with token
export const updateUser = (userData, token) => async (dispatch) => {
  try {
    const { username, email, role } = userData;
    const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, {
      username,
      email,
      role,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
  }
};
// Delete user action with token
export const deleteUser = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
  }
};
