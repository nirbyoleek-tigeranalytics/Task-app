import axios from 'axios';

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/projects');
    dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PROJECTS_FAILURE', payload: error.message });
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const response = await axios.post('/api/projects', project);
    dispatch({ type: 'CREATE_PROJECT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_PROJECT_FAILURE', payload: error.message });
  }
};
