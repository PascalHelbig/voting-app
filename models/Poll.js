var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  question: String,
  answers: Array,
  user: String
});

module.exports = mongoose.model('Poll', pollSchema);
