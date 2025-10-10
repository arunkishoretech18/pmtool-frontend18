import React from 'react';

function CreateTaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent overlay close on modal click
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Close
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="task-title" className="block mb-1 font-medium">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label htmlFor="task-desc" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="task-desc"
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter task description"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
