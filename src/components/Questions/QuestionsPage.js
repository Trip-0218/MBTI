import React, { useState, useEffect } from "react";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userId, setUserId] = useState(""); // Assume you get this from authentication
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/questions/questions"
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      setError("User ID is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/answers/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, answers: selectedAnswers }),
      });

      if (!response.ok) throw new Error("Failed to submit answers");
      alert("Answers submitted successfully");
    } catch (error) {
      setError(error.message);
    }
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
            <h1 className="text-3xl font-bold mb-6">Questions</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {question.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{question.body}</p>
                    <div className="flex flex-col space-y-2">
                      {question.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={question._id}
                            value={option.text}
                            checked={
                              selectedAnswers[question._id] === option.text
                            }
                            onChange={() =>
                              handleOptionChange(question._id, option.text)
                            }
                            className="form-radio"
                          />
                          <span className="text-gray-800">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit Answers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
