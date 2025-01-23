import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Bars/Sidebar";
import Navbar from "../Bars/Navbar";

const HomePage = () => {
  const [examNames, setExamNames] = useState([]);

  // Fetch the questions data from the API
  useEffect(() => {
    const fetchExamNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/questions/questions"
        );
        const questions = response.data;

        // Extract unique exam names from the questions
        const uniqueExamNames = [
          ...new Set(questions.map((question) => question.name)),
        ];

        setExamNames(uniqueExamNames);
      } catch (error) {
        console.error("Error fetching exam names:", error);
      }
    };

    fetchExamNames();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-16 transition-all duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          {/* Hero Section */}
          <div className="bg-green-500 text-white p-6 rounded-lg mb-6">
            <h1 className="text-3xl font-bold">Welcome to ExamPortal</h1>
            <p className="mt-2">
              Your one-stop solution for all your online examinations.
            </p>
            <button className="mt-4 bg-white text-green-500 px-4 py-2 rounded-lg">
              Get Started
            </button>
          </div>

          {/* Upcoming Exams Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
            <div className="bg-white p-4 shadow-md rounded-md">
              <div className="relative">
                {examNames.length > 0 ? (
                  <div className="flex overflow-x-auto space-x-4 pb-4">
                    {examNames.map((name) => (
                      <div
                        key={name}
                        className="bg-gray-200 p-4 rounded-lg shadow-md flex-shrink-0 w-64 z-10"
                      >
                        <h3 className="text-lg font-semibold text-gray-800">
                          {name}
                        </h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No upcoming exams at the moment. Check back later.</p>
                )}
              </div>
            </div>
          </section>

          {/* Recent Results Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
            <div className="bg-white p-4 shadow-md rounded-md">
              <p>
                No recent results available. Take an exam to see your
                performance!
              </p>
            </div>
          </section>

          {/* Featured Courses Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="font-bold">Course 1</h3>
                <p>Introduction to Advanced Mathematics</p>
              </div>
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="font-bold">Course 2</h3>
                <p>Data Science Fundamentals</p>
              </div>
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="font-bold">Course 3</h3>
                <p>Machine Learning Basics</p>
              </div>
            </div>
          </section>

          {/* Announcements Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Announcements</h2>
            <div className="bg-white p-4 shadow-md rounded-md">
              <p>Stay tuned for upcoming announcements and exam updates.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
