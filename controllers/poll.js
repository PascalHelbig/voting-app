var Poll = require('../models/Poll');


/**
 * GET /polls
 */
exports.getPolls = function (req, res) {
  Poll.find({}, function (err, polls) {
    res.render('poll/polls', {polls: polls, user: req.user});
  });
};

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
    return {
      title: answer,
      votes: 0
    };
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

/**
 * GET /polls/vote/:answer
 */
exports.getVote = function (req, res) {
  Poll.findOneAndUpdate({'answers._id': req.params.answer}, {$inc: {'answers.$.votes': 1}}).exec(function (err, poll) {
    if (err) return res.json(err);

    res.redirect('/polls/' + poll._id);
  });
};

/**
 * POST /polls/:id/postNewAnswer
 */
exports.postNewAnswer = function (req, res) {
  var pollId = req.params.id;
  var newAnswer = req.body.newAnswer;

  Poll.findByIdAndUpdate(
    pollId,
    {$push: {answers: {title: newAnswer, votes: 1}}},
    function (err, poll) {
      res.redirect('/polls/' + pollId);
    }
  );
};
