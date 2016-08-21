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
    var day = parseInt(date_arr[2]);
    console.log(parseInt(date_arr[0]) + " " + parseInt(date_arr[1]) + " " + parseInt(date_arr[2]) );
    var querydate = new Date(year,month, day);
    console.log(querydate);



    Question.find({createdAt: {"$gte": querydate}   }, function (err, questions) {
      if (err) {
        res.status(400).send(err);
      }
      res.json(questions);
    });
 }
  // answered method
  // question_by_id method

  // questions_by_date method

};
