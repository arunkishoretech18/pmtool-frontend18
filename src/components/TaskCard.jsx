import React from "react";

export default function TaskCard({ title, description }) {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
