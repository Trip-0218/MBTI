import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-green-500">
        <Link to="/Home">ExamPortal</Link>
      </div>
      <div className="flex items-center space-x-6">
        {/* Navbar Links */}
        <Link
          to="/Home"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Home
        </Link>
        <Link
          to="/Tests"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Tests
        </Link>
        <Link
          to="/QuestionPage"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Questions
        </Link>
        <Link
          to="/QuestionForm"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Question Form
        </Link>
        <Link
          to="/Login"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Login
        </Link>
        <Link
          to="/SignUp"
          className="text-gray-700 hover:text-green-500 font-medium"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md focus:outline-none"
        />
        {/* Icons */}
        <FaBell className="text-gray-500 cursor-pointer" />
        <FaUserCircle className="text-gray-500 cursor-pointer text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
