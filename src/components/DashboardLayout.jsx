import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TaskBoard from "../components/TaskBoard";
import CreateTaskModal from "../components/CreateTaskModal";

export default function Dashboard() {
  const { authToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState(""); // Set a test ID like "123" for debugging
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchTasks = async () => {
      if (!projectId || !authToken) {
        setError("Project ID or authentication required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        const data = await response.json();
        if (isMounted) setTasks(data);
      } catch (err) {
        if (isMounted) setError(err.message || "An error occurred while fetching tasks");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };
  }, [projectId, authToken]);

  const handleCreateTask = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error} <button onClick={() => window.location.reload()} className="ml-2 text-blue-600">Retry</button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleCreateTask}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          New Task
        </button>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <TaskBoard tasks={tasks} projectId={projectId} />
        )}
        {isModalOpen && (
          <CreateTaskModal
            projectId={projectId}
            onClose={handleCloseModal}
            onTaskCreated={handleTaskCreated}
          />
        )}
      </div>
    </div>  
  );
}