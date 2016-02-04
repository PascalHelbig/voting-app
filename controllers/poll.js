var Poll = require('../models/Poll');

/**
 * GET /polls/account
 * get users polls
 */
exports.getAccountPolls = function (req, res) {
  var polls = [
    {_id: 1, question: 'Question 1'},
    {_id: 2, question: 'Question 2'},
    {_id: 3, question: 'Question 3'}
  ];
  res.render('poll/account', {polls: polls});
};

/**
 * GET /polls/new
 * create a new poll
 */
exports.getNewPoll = function (req, res) {
  res.render('poll/new');
};

/**
 * POST /polls/new
 * save new poll
 */
exports.postNewPoll = function (req, res) {
  var poll = new Poll({
    question: req.body.question,
    answers: req.body.answers,
    user: req.user._id
  });
  poll.save(function (err) {
    if (err) return res.json(err);

    res.redirect('/polls/account');
  });
};
