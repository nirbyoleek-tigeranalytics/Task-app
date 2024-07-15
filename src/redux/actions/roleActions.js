import axios from 'axios';

export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/roles');
    dispatch({ type: 'FETCH_ROLES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ROLES_FAILURE', payload: error.message });
  }
};

export const createRole = (role) => async (dispatch) => {
  try {
    const response = await axios.post('/api/roles', role);
    dispatch({ type: 'CREATE_ROLE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_ROLE_FAILURE', payload: error.message });
  }
};

export const updateRole = (role) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/roles/${role.id}`, role);
    dispatch({ type: 'UPDATE_ROLE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_ROLE_FAILURE', payload: error.message });
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/roles/${id}`);
    dispatch({ type: 'DELETE_ROLE_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_ROLE_FAILURE', payload: error.message });
  }
};
