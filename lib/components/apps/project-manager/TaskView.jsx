import { useRef } from "react";

const TaskView = ({ setProjects, selectedProject }) => {
  const tasksInput = useRef();
  //   const [tasks, setTasks] = useState([
  //     { id: 1, text: "Create project wireframes" },
  //     { id: 2, text: "Design database schema" },
  //     { id: 3, text: "Implement user authentication" },
  //   ]);

  const handleAddTask = () => {
    const newTask = tasksInput.current.value;
    if (newTask.trim()) {
      setProjects(function (prevProjects) {
        const updatedTasks = [
          ...selectedProject.tasks,
          { text: newTask }, // Use newTask instead of tasksInput.current.value
        ];

        const updatedProjects = prevProjects.map((project) => {
          if (project.id === selectedProject.id) {
            return {
              ...project,
              tasks: updatedTasks,
            };
          }
          return project;
        });

        tasksInput.current.value = ""; // Move clearing here, after task creation
        return updatedProjects;
      });
    }
  };

  const handleDeleteTask = (taskIndex) => {
    setProjects((prevProjects) => {
      const updatedTasks = selectedProject.tasks.filter(
        (_, index) => index !== taskIndex
      );

      return prevProjects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: updatedTasks,
          };
        }
        return project;
      });
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="mb-8">
        <input
          type="text"
          ref={tasksInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          placeholder="Add a new task..."
          className="w-full bg-gray-700 text-gray-200 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500"
        />
      </div>
      <div className="space-y-2">
        {selectedProject.tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="flex justify-between items-center text-gray-300"
          >
            {task.text}
            <button
              onClick={() => handleDeleteTask(taskIndex)}
              className="ml-4 px-2 py-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskView;