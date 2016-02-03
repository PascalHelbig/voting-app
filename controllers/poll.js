/**
 * GET /account/pools
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
