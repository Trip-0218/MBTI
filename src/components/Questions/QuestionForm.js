import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([
    {
      title: '',
      body: '',
      options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      difficulty: 'easy',
      name: '',
    },
  ]);

  // Function to handle input change for each question
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Function to handle input change for options
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].text = value;
    setQuestions(updatedQuestions);
  };

  // Function to add a new question form
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        body: '',
        options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
        difficulty: 'easy',
        name: '',
      },
    ]);
  };

  // Function to submit all questions
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/questions/questions/add', {
        questions,
      });
      console.log(response.data); // Log response or handle it accordingly
      alert('Questions submitted successfully!');
    } catch (error) {
      console.error('Error submitting questions:', error);
      alert('Failed to submit questions.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-5 p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Create Questions Form</h2>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-lg shadow-sm">
          <label className="block mb-2 font-semibold">
            Exam Name:
            <input
              type="text"
              value={question.name}
              onChange={(e) => handleQuestionChange(qIndex, 'name', e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter exam name"
            />
          </label>

          <label className="block mb-2 font-semibold">
            Difficulty:
            <select
              value={question.difficulty}
              onChange={(e) => handleQuestionChange(qIndex, 'difficulty', e.target.value)}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label className="block mb-2 font-semibold">
            Question:
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter the question"
            />
          </label>

          <label className="block mb-2 font-semibold">
            Description:
            <textarea
              value={question.body}
              onChange={(e) => handleQuestionChange(qIndex, 'body', e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter the question description"
            />
          </label>

          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Option ${oIndex + 1}`}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={addNewQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Another Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Questions
      </button>
    </div>
  );
};

export default QuestionForm;
