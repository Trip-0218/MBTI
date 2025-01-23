const mongoose = require("mongoose");

const { Schema } = mongoose;

//User Responses schema ->
const ResponseSchema = new Schema({
  userId: Schema.Types.ObjectId,
  questionId: Schema.Types.ObjectId,
  selectedChoiceId: Schema.Types.ObjectId,
});

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
