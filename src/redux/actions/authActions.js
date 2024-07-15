import axios from 'axios';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
