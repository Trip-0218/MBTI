import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";

const QuestionsDetailPage = () => {
  const { name } = useParams(); // Get the name from the URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current question index

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/questions/questions?name=${encodeURIComponent(name)}`
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
  }, [name]);

  const handleOptionChange = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Assuming user ID is available from authentication or context
    const userId = "exampleUserId"; // Replace with actual user ID logic

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

  const currentQuestion = questions[currentIndex];

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Questions for {name}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : currentQuestion ? (
          <div className="space-y-4">
            <div
              key={currentQuestion._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-600">
                Question ID: {currentQuestion._id}
              </h2>
              <h2 className="text-xl font-semibold mb-2">
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                {currentQuestion.title}
              </h3>
              <p className="text-gray-600 mb-4">{currentQuestion.body}</p>
              <div className="flex flex-col space-y-2">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option._id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={currentQuestion._id}
                      value={option.text}
                      checked={selectedAnswers[currentQuestion._id] === option.text}
                      onChange={() =>
                        handleOptionChange(currentQuestion._id, option.text)
                      }
                      className="form-checkbox"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded ${
                  currentIndex === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </>
  );
};

export default QuestionsDetailPage;
