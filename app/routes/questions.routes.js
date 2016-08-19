module.exports = function(app) {
  var questionsController = require('../controllers/questions.controller');


  // restful questions routes. Should have the following routes:
  // /questions with action "get" that calls the index method in questionsController shows all the questions

  // /questions with action "post" that calls the create method in questionsController that creates new question

  // /questions/:date with action "get" that calls the dateshow method in questionsController shows all the questions created on that date

  // /questions/:question_id with action "put" that calls the answered method updates the answered field of the question with id = question_id


  app.param('question_id', questionsController.question_by_id);
  app.param('date', questionsController.questions_by_date);


};
