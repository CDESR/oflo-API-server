module.exports = function(app) {
  var usersController = require('../controllers/users.controller');


  // restful USER routes. Should have the following routes:


  // /users/signup with action "post" that calls the create method in usersControllor
app.route('/users/signup')
    .post(usersController.create);


  // /users/login with action "post" that calls the login method in usersControllor
app.route('/users/login')
    .post(usersController.login);


  // users/:user_id with action "get" that calls the show method in usersControllor
  // /users/:user_id with action "put" that calls the update method in usersControllor
app.route('/users/:user_id')
    .get(usersController.show)
    .put(usersController.update);




  // app.param('user_id', usersController.user_by_id);

  // app.param('user_id', usersControllor.user_by_id);

 };
