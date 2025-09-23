import React from 'react';

function TailwindTest() {
  return (
    // Main container to center the content
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">

      {/* Test Card */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            React + Tailwind
          </h1>
          <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            It's Working! 🚀
          </div>
        </div>

        {/* Body Text */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          If you see this card styled correctly, your React and Tailwind CSS integration is a success. You can now build beautiful interfaces with utility-first CSS.
        </p>

        {/* Responsive Design Test */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          This text is regular size. On medium screens and up, it becomes larger.
          <span className="md:text-lg"> → I get bigger on wide screens!</span>
        </p>

        {/* Button with Hover & Focus States */}
        <div className="mt-8">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
            Hover Over Me
          </button>
        </div>

      </div>
    </div>
  );
}

export default TailwindTest;