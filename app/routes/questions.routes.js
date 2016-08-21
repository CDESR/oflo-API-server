module.exports = function(app) {
  var questionsController = require('../controllers/questions.controller');


  // restful questions routes. Should have the following routes:
  app.route('/questions')
    .get(questionsController.index)
    .post(questionsController.create);
  // /questions with action "get" that calls the index method in questionsController shows all the questions

  // /questions with action "post" that calls the create method in questionsController that creates new question

  // /questions/:date with action "get" that calls the dateshow method in questionsController shows all the questions created on that date
  app.route('/questions/:date')
    .get(questionsController.dateshow);

  // /questions/:question_id with action "put" that calls the answered method updates the answered field of the question with id = question_id
  // app.route('/questions/question_id')
  //   .put(answered)


  // app.param('question_id', questionsController.question_by_id);
  


};
