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
     var question_object = req.body;
     var questionObject = new Question(req.body.question);

     var new_question = new Question(question_object);


     new_question.save(function(err, question) {
       if (err) return res.status(400).send(err);
       return res.status(200).send(question);
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
  answered: function(req, res, next) {

    var question_id = req.params.question_id;

    var answered = req.body.answered;

    Question.findById(question_id, function(err, doc) {
      if (doc) {
        doc.answered = answered;

        doc.save(function (err) {
          if (err) return res.status(400).send(err);
          res.send(doc);

        });
      }

    });
  }
};
