import { useEffect } from "react";
import ProjectInfo from "./ProjectInfo";
import TaskView from "./TaskView";
import AddProjectModal from "./AddProjectModal";

export default function MainPanel({
  selectedProject,
  setProjects,
  isDialogOpen,
  setIsDialogOpen,
  setSelectedProject,
  projects,
}) {
  useEffect(() => {
    if (selectedProject) {
      const updatedProject = projects.find((p) => p.id === selectedProject.id);
      setSelectedProject(updatedProject);
    }
  }, [projects]);

  return (
    <div className="p-8 bg-gray-900 font-mono w-full transition-all duration-300 sm:pl-72 sm:pr-8 h-screen">
      <div className="w-full h-full flex flex-col gap-8">
        {isDialogOpen ? (
          <AddProjectModal
            setIsDialogOpen={setIsDialogOpen}
            setProjects={setProjects}
            setSelectedProject={setSelectedProject}
            projects={projects}
          />
        ) : selectedProject ? (
          <>
            <ProjectInfo
              setSelectedProject={setSelectedProject}
              selectedProject={selectedProject}
              setProjects={setProjects}
            />
            <TaskView
              setProjects={setProjects}
              selectedProject={selectedProject}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-gray-200">
              Add or Select a Project
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}