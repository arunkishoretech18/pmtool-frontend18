import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

const sidebarLinks = [
  { name: 'Projects', href: '/dashboard/projects' },
  { name: 'Team', href: '/dashboard/team' },
];

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-4 font-bold text-xl border-b">Project Manager</div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:bg-blue-100 px-3 py-2 rounded"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders the nested route's element */}
      </main>
    </div>
  );
}

export default DashboardLayout;
