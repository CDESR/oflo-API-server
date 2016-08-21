var Question = require('mongoose').model('Question');
var User = require('mongoose').model('User');

module.exports = {
  // index method
  index: function(req, res, next) {
  Question.find({}, function(err, questions) {
    if (err) return next(err);

    res.json(questions);
  });
},
  // create method
  create: function(req, res, next) {
     var question = new Question(req.body);
     question.question_content = "test question";
     var new_user = new User();
    //  question.users.push(new_user);

     question.save(function(err) {
       if (err) return next(err);
       res.json(question);
     });
   },

  // dateshow method
  dateshow: function(req, res, next) {
    res.json(new Date());
 }
  // answered method
  // question_by_id method

  // questions_by_date method

};
