import React from "react";

export default function TaskBoard({ tasks, projectId }) {
  const statuses = ["To Do", "In Progress", "Done"];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {statuses.map((status) => (
        <div key={status} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4" role="heading" aria-level="2">
            {status} ({getTasksByStatus(status).length})
          </h2>
          <div className="space-y-4">
            {getTasksByStatus(status).map((task) => (
              <div
                key={task._id}
                className="p-3 bg-gray-50 rounded border border-gray-200"
                role="region"
                aria-label={`${task.title} task`}
              >
                <h3 className="font-medium">{task.title}</h3>
                {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
                {task.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {!tasks.length && (
        <div className="col-span-full text-center text-gray-500" role="alert">
          No tasks available for project ID: {projectId}
        </div>
      )}
    </div>
  );
}