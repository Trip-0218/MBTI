// Sidebar.jsx
import React, { useState } from "react";
import { FaHome, FaBook, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-green-500 text-white transition-width duration-300 ease-in-out ${
        isHovered ? "w-48" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center mt-6">
        {/* Sidebar Logo */}
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl font-bold">EP</span>
        </div>
        {/* Sidebar Menu */}
        <nav className="flex flex-col space-y-4 mt-4">
          <a href="/" className="flex items-center p-2 hover:bg-green-600 rounded">
            <FaHome className="mr-2" />
            <span className={`${isHovered ? "inline-block" : "hidden"} text-sm`}>Home</span>
          </a>
          <a href="/" className="flex items-center p-2 hover:bg-green-600 rounded">
            <FaBook className="mr-2" />
            <span className={`${isHovered ? "inline-block" : "hidden"} text-sm`}>Courses</span>
          </a>
          <a href="/Tests" className="flex items-center p-2 hover:bg-green-600 rounded">
            <FaCalendarAlt className="mr-2" />
            <span className={`${isHovered ? "inline-block" : "hidden"} text-sm`}>Exams</span>
          </a>
          <a href="/" className="flex items-center p-2 hover:bg-green-600 rounded">
            <FaInfoCircle className="mr-2" />
            <span className={`${isHovered ? "inline-block" : "hidden"} text-sm`}>About</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
