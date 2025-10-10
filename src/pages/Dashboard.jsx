import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskBoard from "../components/TaskBoard";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Opens the task creation modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Closes the task creation modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard 🎉</h1>
    
    {/* New Task Button */}
    <button
      onClick={openModal}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-blue-700"
    >
      New Task
    </button>
    
    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>

    {/* Task Board */}
    <div className="w-full max-w-6xl mt-8">
      <TaskBoard />
    </div>

    {/* Create Task Modal */}
    <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} />
  </div>
);

}
