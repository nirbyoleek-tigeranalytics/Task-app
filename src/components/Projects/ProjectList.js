import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/actions/projectActions';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (!projects) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Project List</h2>
      {projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        projects.map(project => (
          <div key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {/* Add other project details as needed */}
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
