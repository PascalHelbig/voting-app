var Poll = require('../models/Poll');

/**
 * GET /polls/account
 * get users polls
 */
exports.getAccountPolls = function (req, res) {
  Poll.find({user: req.user._id}, function (err, polls) {
    if (err) return res.json(err);

    res.render('poll/account', {polls: polls});
  });
};

/**
 * GET /polls/new
 * create a new poll
 */
exports.getNewPoll = function (req, res) {
  res.render('poll/edit', {poll: {answers: [{}]}});
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

/**
 * GET /polls/delete/:id
 */
exports.getDelete = function (req, res) {
  Poll.remove({
    _id: req.params.id,
    user: req.user._id
  }, function (err) {
    if (err) return res.json(err);

    res.redirect('/polls/account');
  });
};

/**
 * GET /polls/edit/:id
 */
exports.getEdit = function (req, res) {
  Poll.findOne({
    _id: req.params.id,
    user: req.user._id
  }, function (err, poll) {
    if (err) return res.json(err);

    res.render('poll/edit', {poll: poll});
  });
};

/**
 * POST /polls
 */
exports.postPoll = function (req, res) {
  var id = req.body._id;

  var answers = req.body.answers.map(function (answer) {
    return {title: answer};
  });
  req.body.answers = answers;

  if (id !== "") {
    Poll.findOneAndUpdate({
      _id: id,
      user: req.user._id
    }, req.body, {upsert: true}, function (err) {
      if (err) return res.json(err);
    });
  } else {
    req.body.answers = req.body.answers.map(function(answer) {
      answer.votes = 0;
      return answer;
    });

    var poll = new Poll({
      question: req.body.question,
      answers: req.body.answers,
      user: req.user._id
    });
    poll.save(function (err) {
      if (err) return res.json(err);
    });
  }
  res.redirect('/polls/account');
};

/**
 * GET /polls/:id
 */
exports.getPoll = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    res.render('poll/poll', {poll: poll});
  });
};
