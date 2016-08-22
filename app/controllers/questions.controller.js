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
     var new_user = new User();
    //  question.users.push(new_user);

     question.save(function(err) {
       if (err) return next(err);
       res.json(question);
     });
   },

  // dateshow method
  dateshow: function(req, res, next) {
    var date = req.params.date;
    var date_arr = date.split('-');
    var year = parseInt(date_arr[0]);
    var month = parseInt(date_arr[1] -1);
    var startday = parseInt(date_arr[2]);
    var endday = parseInt(date_arr[2] +1);

    var querystartdate = new Date(year,month, startday);
    var queryenddate = new Date(year,month, endday);

    Question.find({createdAt: {"$gte": querystartdate, "$lt": queryenddate}   }, function (err, questions) {
      if (err) {
        res.status(400).send(err);
      }
      res.json(questions);
    });
 },
  // answered method
  answered: function(req, res) {
    var question_id = req.params.question_id;
    var answered = new answered(req.body);
    // question.answered = default false;
    res.json(answered);
  },

  // questions_by_date method
  questions_by_date: function (req, res) {
    var question_date = req.params.question_date;
      Question.findOne({_date: question_date}, function (err, question) {
      if(err) res.status(400).send(err);
      res.send(question);
    })
  },

  // question_by_id method
questions_by_id: function (req, res) {
  var question_id = req.params.question_id;

  Question.findOne({_id: question_id}, function (err, question) {
    if (err) res.status(400).send(err);
    res.send(question);
  })
}
}
