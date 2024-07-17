import axios from 'axios';

export const fetchProjects = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:5000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Fetch Projects API Response:', response.data);

    dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Fetch Projects API Error:', error); // Log the error
    dispatch({ type: 'FETCH_PROJECTS_FAILURE', payload: error.message });
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post('http://localhost:5000/api/projects', project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Create Project API Response:', response.data);

    dispatch({ type: 'CREATE_PROJECT_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Create Project API Error:', error); // Log the error
    dispatch({ type: 'CREATE_PROJECT_FAILURE', payload: error.message });
  }
};
