import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import CreateTaskModal from "../components/CreateTaskModal"; // Adjust path as needed

export default function Dashboard() {
  const { authToken: contextToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState("test-project");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("authToken") || contextToken || "dummy-token";
        console.log("Fetch Token:", token);
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setTasks(response.data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "An error occurred while fetching tasks");
          console.error("Fetch Error:", err.response ? err.response.data : err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTasks();
    return () => { isMounted = false; };
  }, [projectId, contextToken]);

  const handleLogout = () => navigate("/login");

  const handleNewTask = () => {
    console.log("Opening modal for projectId:", projectId);
    setIsModalOpen(true);
  };

  const handleTaskCreated = (newTask) => {
    console.log("New task created:", newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Project Manager</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">Projects</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">Team</a>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Dashboard 🎉</h2>
          <div className="flex justify-center">
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">Logout</button>
          </div>
        </header>
        <section className="flex-1 p-6 overflow-x-auto">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="h-full">
              <div className="mb-6 text-center">
                <button onClick={handleNewTask} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">New Task</button>
              </div>
              <div className="flex space-x-6 h-full">
                <div className="flex-1 bg-gray-100 rounded-lg p-4 min-w-[300px]">
                  <h3 className="font-semibold text-gray-700 mb-4">To Do</h3>
                  <div className="space-y-4">{tasks.filter((task) => task.status === "pending").map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.subtitle || task.description}</p>
                    </div>
                  ))}</div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg p-4 min-w-[300px]">
                  <h3 className="font-semibold text-gray-700 mb-4">In Progress</h3>
                  <div className="space-y-4">{tasks.filter((task) => task.status === "in-progress").map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.subtitle || task.description}</p>
                    </div>
                  ))}</div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg p-4 min-w-[300px]">
                  <h3 className="font-semibold text-gray-700 mb-4">Done</h3>
                  <div className="space-y-4">{tasks.filter((task) => task.status === "completed").map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.subtitle || task.description}</p>
                    </div>
                  ))}</div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* Modal integration */}
        {isModalOpen && <CreateTaskModal projectId={projectId} onClose={() => setIsModalOpen(false)} onTaskCreated={handleTaskCreated} />}
      </main>
      <style jsx>{`
        @media (max-width: 768px) {
          .flex { flex-direction: column; }
          aside { width: 100%; height: auto; }
          main { overflow-y: auto; }
          section > div { flex-direction: column; space-x-0; space-y-6; }
          section > div > div { min-width: 100% !important; }
        }
        body { font-family: 'Inter', 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}