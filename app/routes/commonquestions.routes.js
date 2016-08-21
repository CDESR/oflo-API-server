module.exports = function(app) {
  var commonquestionsController = require('../controllers/commonquestions.controller');


  // restful collatedquestions routes. Should have the following routes:
  // /commonquestions with action "get" that calls the index method in commonquestionsController that shows all the common questions

  // /commonquestions with action "post" that calls the create method in commonquestionsController that creates new common question

  // /commonquestions/vote with action "get" that calls the showvote method in commonquestionsController that shows all the common questions that has "can vote" field set as true

  // /commonquestions/vote with action "put" that calls the changestatus method in commonquestionsController that updates the "can vote" field

  // /commonquestions/ with action "post" that calls the create method in commonquestionsController that creates new common question

  // /commonquestions/:date with action "get"  that calls the dateshow method in commonquestionsController that shows the common questions that corresponds to the :date.

  // /commonquestions/:commonquestion_id/yes with action "get" that calls the showyes method in commonquestionsController that shows all the users that voted yes for the common question that has has id = :commonquestion_id

  // /commonquestions/:commonquestion_id/yes with action "put" that calls the voteyes method in commonquestionsController that updates the common question with id = :commonquestion_id and pushes in the name of the user into the "yes" array

  // /commonquestions/:commonquestion_id/no with action "get" that calls the showno method in commonquestionsController that shows all the users that voted no for the common question that has has id = :commonquestion_id

  // /commonquestions/:commonquestion_id/no with action "put" that calls the voteno method in commonquestionsController that updates the common question with id = :commonquestion_id and pushes in the name of the user into the "no" array

  // /commonquestions/:commonquestion_id/answered with action "put" that calls the answered method in the commonquestionsController that updates the answered field of the  common question with id = :commonquestion_id


  // app.param('commonquestion_id', commonquestionsController.commonquestion_by_id );
  //
  // app.param('date', commonquestionsController.commonquestions_by_date);

};
