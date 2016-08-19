var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/user.model');
  require('../app/models/question.model');
  require('../app/models/commonquestion.model');
  return db;
};
