module.exports = function(app) {
  var commonquestionsController = require('../controllers/commonquestions.controller');


  // restful collatedquestions routes. Should have the following routes:
  // /commonquestions with action "get" that calls the index method in commonquestionsController that shows all the common questions

  // /commonquestions with action "post" that calls the create method in commonquestionsController that creates new common question

  app.route('/commonquestions')
    .get(commonquestionsController.index)
    .post(commonquestionsController.create);


  // /commonquestions/vote with action "get" that calls the showvote method in commonquestionsController that shows all the common questions that has "can vote" field set as true

  // /commonquestions/vote with action "put" that calls the changestatus method in commonquestionsController that updates the "can vote" field

  app.route('/commonquestions/vote')
    .get(commonquestionsController.showvote);

  app.route('/commonquestions/:commonquestion_id')
    .put(commonquestionsController.changestatus);

  // app.route('/commonquestions/vote/:commonquestion_id')
  //   .put(commonquestionsController.changestatus);

  // /commonquestions/ with action "post" that calls the create method in commonquestionsController that creates new common question

  // ** above route is repeated

  // /commonquestions/:date with action "get"  that calls the dateshow method in commonquestionsController that shows the common questions that corresponds to the :date.

  // app.route('/commonquestions/:date')
  //   .get(commonquestionsController.dateshow);


  // /commonquestions/:commonquestion_id/yes with action "get" that calls the showyes method in commonquestionsController that shows all the users that voted yes for the common question that has has id = :commonquestion_id

  // /commonquestions/:commonquestion_id/yes with action "put" that calls the voteyes method in commonquestionsController that updates the common question with id = :commonquestion_id and pushes in the name of the user into the "yes" array

  app.route('/commonquestions/:commonquestion_id/yes')
    .get(commonquestionsController.showyes)
    .put(commonquestionsController.voteyes);

  // /commonquestions/:commonquestion_id/no with action "get" that calls the showno method in commonquestionsController that shows all the users that voted no for the common question that has has id = :commonquestion_id

  // /commonquestions/:commonquestion_id/no with action "put" that calls the voteno method in commonquestionsController that updates the common question with id = :commonquestion_id and pushes in the name of the user into the "no" array

  app.route('/commonquestions/:commonquestion_id/no')
    .get(commonquestionsController.showno)
    .put(commonquestionsController.voteno);

  // /commonquestions/:commonquestion_id/answered with action "put" that calls the answered method in the commonquestionsController that updates the answered field of the  common question with id = :commonquestion_id

  app.route('/commonquestions/:commonquestion_id/answered')
    .put(commonquestionsController.answered);

};
