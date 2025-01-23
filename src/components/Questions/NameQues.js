import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";

const QuestionsPage = () => {
  const [questionNames, setQuestionNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/questions/questions"
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();

        // Extract unique question names
        const names = Array.from(
          new Set(data.map((question) => question.name))
        );
        setQuestionNames(names);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleCardClick = (name) => {
    navigate(`/Tests/${encodeURIComponent(name)}`);
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-16 transition-all duration-300">
          {/* Navbar */}
          <Navbar />
          <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Tests</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {questionNames.map((name, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(name)}
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
