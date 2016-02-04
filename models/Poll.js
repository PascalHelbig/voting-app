var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  title: String,
  votes: Number
});

var pollSchema = new mongoose.Schema({
  question: String,
  answers: [answerSchema],
  user: String
});

module.exports = mongoose.model('Poll', pollSchema);
