const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");
const { body, validationResult } = require("express-validator");

// Middleware to validate question data
const validateQuestionsArray = [
  body("questions")
    .isArray()
    .withMessage("Questions must be an array")
    .notEmpty()
    .withMessage("Questions array is required"),
  body("questions.*.title", "Title is required").notEmpty().trim().escape(),
  body("questions.*.body", "Body is required").notEmpty().trim().escape(),
  body("questions.*.options", "Options are required")
    .isArray({ min: 1 })
    .withMessage("Options must be a non-empty array"),
  body("questions.*.name", "Exam name is required").notEmpty().trim().escape(),
];

// Route 01 - Create new questions / POST -> api/questions/add
router.post("/questions/add", validateQuestionsArray, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const questionsArray = req.body.questions;

  try {
    const savedQuestions = [];
    for (const questionData of questionsArray) {
      const { title, body, options, difficulty, name } = questionData;

      const question = new Question({
        title,
        body,
        options,
        difficulty,
        name,
      });

      const savedQuestion = await question.save();
      savedQuestions.push(savedQuestion);
    }

    res.status(201).json(savedQuestions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 02 - Get all questions or filter by name / GET -> api/questions
router.get("/questions", async (req, res) => {
  try {
    const { name } = req.query;
    const query = {};
    if (name) query.name = name; // If name is provided, filter by exam name

    const questions = await Question.find(query);
    res.status(200).json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 06 - Get unique question names / GET -> api/questions/names
router.get("/questions/names", async (req, res) => {
  try {
    // Fetch distinct names from the Question collection
    const names = await Question.distinct("name");
    res.status(200).json(names);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 03 - Update a question / PUT -> api/questions/:id
router.put("/questions/:id", validateQuestionsArray, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).send("Question not found");
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 04 - Delete a question / DELETE -> api/questions/:id
router.delete("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send("Question not found");
    }
    res.status(200).send("Question deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 05 - Submit answers / POST -> api/answers/submit
router.post("/questions/submit", async (req, res) => {
  const { userId, answers } = req.body;

  if (!userId || !answers || !Array.isArray(answers)) {
    return res.status(400).send("Invalid input");
  }

  try {
    // Add your logic for saving the answers in the database
    // For now, we'll simply return a success message
    res.status(200).send("Answers submitted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
