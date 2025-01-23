const mongoose = require("mongoose");

const { Schema } = mongoose;

// Choice schema
const ChoiceSchema = new Schema({
  text: String, // Stores the text of the choice
});

// Question schema
const QuestionSchema = new Schema({
  title: String,
  body: String,
  options: [ChoiceSchema], // Array of choices
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  name :String,
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
