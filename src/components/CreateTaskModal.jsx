import React, { useState } from "react";
import axios from "axios";

export default function CreateTaskModal({ projectId, onClose, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title || !projectId) {
      setError("Title and Project ID are required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title,
        description: description || "",
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        project_id: projectId, // Match backend field name
        status: "To Do", // Match backend default and valid values
      };
      console.log("Submitting Payload:", JSON.stringify(payload, null, 2));

      const postmanToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUzN2Y4N2Y2ODc5OTA4ODEzMGQyODkiLCJpYXQiOjE3NjA3ODY4NDksImV4cCI6MTc2MDc5MDQ0OX0.CzMU4KK3BIPiDyCDA2ly-sQP2LZzLCnxA_eYaOmmSOk"; // Replace with your Postman token
      const storedToken = localStorage.getItem("authToken");
      const token = storedToken || postmanToken;
      console.log("Tokens - Stored:", storedToken, "Using:", token);

      const response = await axios.post(
        "http://localhost:5000/api/tasks", // Verify this URL
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        onTaskCreated(response.data);
        onClose();
      } else {
        setError(`Failed to create task. Status: ${response.status}, Data: ${JSON.stringify(response.data)}`);
      }
    } catch (err) {
      console.error("API Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config,
      });
      setError(
        err.response?.data?.message ||
        err.message ||
        "An error occurred while creating the task."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Task</h2>
        {error && <div className="text-red-600 text-sm mb-4" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}