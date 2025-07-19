import React from "react";

const ProjectInfo = ({ setSelectedProject, selectedProject, setProjects }) => {
  const handleDeleteTask = function () {
    setProjects(function (projects) {
      return projects.filter((project) => {
        if (project.id != selectedProject.id) {
          return true;
        } else {
          setSelectedProject(undefined);
          return false;
        }
      });
    });
  };
  return (
    <div className="w-full p-8 mt-4 bg-gray-900 rounded-lg">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-4xl font-bold text-gray-200">
          {selectedProject.name}
        </h2>
        <button
          onClick={() => {
            handleDeleteTask();
          }}
          className="px-3 py-2 text-sm text-gray-400 bg-gray-900 hover:text-red-400 transition-colors"
        >
          Delete Project
        </button>
      </div>
      <p className="text-xl text-gray-300 mb-6">
        <span className="font-bold">Description: </span>
        {selectedProject.description}
      </p>
      <p className="text-lg text-gray-300">
        <span className="font-bold">Due Date: </span>
        {new Date(selectedProject.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default ProjectInfo;
