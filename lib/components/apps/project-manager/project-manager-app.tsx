import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainPanel
 from "./MainPanel";
const localProjects = JSON.parse(localStorage.getItem("savedProjects")!);

 function ProjectManagerApp() {
  // retrieving project information from localstorage:

  const [projects, setProjects] = useState(localProjects || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(
    function () {
      localStorage.setItem("savedProjects", JSON.stringify(projects));
    },
    [projects]
  );

  return (
    <div className="w-full h-full flex flex-col sm:flex-row min-h-0">
      <Sidebar
        projects={projects}
        setIsDialogOpen={setIsDialogOpen}
        setSelectedProject={setSelectedProject}
      />
      <div className="flex-1 min-h-0 w-full">
        <MainPanel
          selectedProject={selectedProject}
          setProjects={setProjects}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      </div>
    </div>
  );
}

export default ProjectManagerApp;

// to do:
// when i click on the "add project" button, it should open the dialogbox on the Main Panel component
// and when i hit save on the side of that shech, it adds that to the projects state variable ✅

// when i click on a project on the sidebar, it pulls out the info and shech of that project on the main panel inside
// the ProjectInfo component -> all I need to do is set the selectedProject to the one that I just clicked on ✅

// add a "task adder" inside the TaskView component ✅

// add a "delete project" functionality ✅

// connect with localstorage ✅

// add the strikethrough functionality (add a clear button)