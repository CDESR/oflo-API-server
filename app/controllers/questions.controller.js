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
  
  // answered method
  answered: function(req, res, next) {
    var question_id = req.params.question_id;
    var answered = new Answered(req.body);
    question.answered = default false;
    res.json(answered);
  }

  // questions_by_date method
  questions_by_date: function(req, res, next) {
    var questions_by_date =
  }

  // question_by_id method
  question_by_id: function(req, res, next) {
    var question_by_id = question
  }
};
