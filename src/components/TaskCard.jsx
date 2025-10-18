import React from "react";

export default function TaskCard({ task }) {
  if (!task || !task._id) {
    return null; // Handle invalid task data gracefully
  }

  return (
    <div
      className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
      role="region"
      aria-label={`${task.title} task details`}
    >
      <h3 className="font-medium text-sm truncate" role="heading" aria-level="3">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-500 mt-1">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-1">Status: {task.status || "To Do"}</p>
    </div>
  );
}