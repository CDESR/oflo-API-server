var User = require('mongoose').model('User');
var jwt_secret = 'somesuperlongwordthatnoonewillknownwhateverwheneverwherever';
var jwt = require('jsonwebtoken');



module.exports = {

  // create method------------------------------
  create: function(req, res, next) {
    // res.send(req.body);
    // set var for the posted requests
    var user_object = req.body;

    var userObject = new User(req.body.user);

    // set new user object
    var new_user = new User(user_object);

    // save the new user object
    new_user.save(function(err, user) {
      if (err) return res.status(400).send(err);
      return res.status(200).send(user);
    });
  },


  // login method-------------------------------
  login: function (req, res, next) {
  var input_user = req.body;

  // 1. take in the email from req.body
  // 2. find user based on that email
  // 3. get password based on that user
  // 4. compare it with req.body.password

  User.findOne({ email: input_user.email }, function (err, db_user) {
    if(err) res.send(err);

    if(db_user) {
      db_user.auth( input_user.password, function(err, is_match_password) {
        if(err) return res.status(500).send(err);

        if(is_match_password) {
          var payload = {
            id: db_user.id,
            email: db_user.email
          };
          var expiryObj = {
            expiresIn: '3h'
          };
          var jwt_token = jwt.sign(payload, jwt_secret, expiryObj);

          return res.status(200).send(jwt_token);
        } else {
          return res.status(401).send({ message: 'login failed' });
        }
      });
    } else {
      return res.status(401).send({ message: 'user not found in database' });
    }
  });
},


  // show method--------------------------------
  show: function(req, res) {
  var user_id = req.params.user_id;

  User.findOne({ _id: user_id }, function(err, user) {
    if(err) res.status(400).send(err);

    res.send(user);
  });
},

  // update method---------------------------------


//   update: function(req, res) {
//   var user_id = req.params.user_id;
//   var updated_user = new User(req.body);
//
//   updated_user.save(function(err) {
//     if (err) return res.status(400).send(err);
//     res.send(updated_user);
//   });
// }

update: function(req, res, next) {
    var user_id = req.user.id;

    User.findByIdAndUpdate(user_id, req.body, function(err, user) {
      if (err) res.status(400).send(err);
      User.findOne({
        _id: user_id
      }, function(err, user) {
        res.json(user);
      });
    });
  }


  // user_by_id method



};
