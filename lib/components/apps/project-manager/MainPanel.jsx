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
    <div className="bg-gray-900 font-mono w-full h-full min-h-0 flex flex-col transition-all duration-300 px-2 py-4 sm:pl-72 sm:pr-8 sm:px-8 sm:py-8">
      <div className="flex-1 min-h-0 w-full flex flex-col gap-6">
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
          <div className="flex items-center justify-center flex-1 min-h-0">
            <h2 className="text-2xl font-bold text-gray-200 text-center">
              Add or Select a Project
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}