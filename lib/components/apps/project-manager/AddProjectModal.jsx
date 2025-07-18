import { useState, useRef } from "react";

export default function AddProjectModal({
  setIsDialogOpen,
  setProjects,
  setSelectedProject,
  projects,
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProject = {
      id: "proj" + String(Date.now()),
      name: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
      tasks: [],
    };

    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      // Set selected project after updating projects
      setSelectedProject(newProject);
      return updatedProjects;
    });

    // thing i learned: to make sure tasks are carries sychronously after callback functions
    // i need to include the time-sensitive function inside the callback function itself
    // before the return statement

    setIsDialogOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-999999">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-xl w-96"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-1">
              Project Title
            </label>
            <input
              type="text"
              ref={titleRef}
              id="title"
              name="title"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-300 mb-1">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              id="description"
              name="description"
              rows="3"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-gray-300 mb-1">
              Due Date
            </label>
            <input
              ref={dateRef}
              type="date"
              id="dueDate"
              name="dueDate"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
}