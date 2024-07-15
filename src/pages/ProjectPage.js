import React from 'react';
import ProjectForm from '../components/Projects/ProjectForm';
import ProjectList from '../components/Projects/ProjectList';

const ProjectPage = () => {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectForm />
      <ProjectList />
    </div>
  );
};

export default ProjectPage;
