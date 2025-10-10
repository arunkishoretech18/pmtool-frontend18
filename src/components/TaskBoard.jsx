import React from "react";
import TaskCard from "./TaskCard";

const mockTasks = [
  { id: 1, title: "Design Homepage", description: "Create wireframes", status: "To Do" },
  { id: 2, title: "Setup API", description: "Implement REST endpoints", status: "In Progress" },
  { id: 3, title: "User Authentication", description: "Login & Registration", status: "Done" },
];

const columns = ["To Do", "In Progress", "Done"];

export default function TaskBoard() {
  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      {columns.map((col) => (
        <div key={col} className="flex-1 bg-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">{col}</h2>
          {mockTasks
            .filter((task) => task.status === col)
            .map((task) => (
              <TaskCard key={task.id} title={task.title} description={task.description} />
            ))}
        </div>
      ))}
    </div>
  );
}
