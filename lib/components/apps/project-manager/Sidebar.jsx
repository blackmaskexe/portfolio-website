import React, { useState, useEffect } from "react";

const Sidebar = ({ projects, setIsDialogOpen, setSelectedProject }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProjectClick = (index) => {
    setSelectedProject(projects[index]);
  };

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-6 left-6 z-[60] text-gray-400 hover:text-gray-200 transition-colors block sm:hidden"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      <aside
        className={`$${
          isCollapsed ? "hidden w-16 sm:flex" : "w-64 border-r border-gray-700"
        } h-full bg-gray-900 font-mono flex flex-col transition-all duration-300`}
      >
        <div
          className={`p-6 ${
            isCollapsed ? "items-center" : ""
          } flex flex-col sm:mt-0 mt-15`}
        >
          <div className="flex items-center justify-between w-full mb-6">
            {!isCollapsed && (
              <h1 className="text-2xl font-bold text-white">Project Manager</h1>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full my-4 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 rounded-lg border border-gray-600 py-3 px-4 hover:from-gray-600 hover:to-gray-700 focus:from-gray-600 focus:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-all"
            >
              {isCollapsed ? "+" : "+ Add Project"}
            </button>
          )}
        </div>
        {!isCollapsed && (
          <ul
            className={`${
              isCollapsed ? "px-2" : "px-6"
            } pb-6 space-y-3 overflow-y-auto flex-1`}
          >
            {projects.map((project, index) => (
              <li key={index}>
                <button
                  onClick={() => handleProjectClick(index)}
                  className="w-full text-left p-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:border-gray-700 transition-colors"
                >
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
};

export default Sidebar;