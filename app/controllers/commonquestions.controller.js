var CommonQuestion = require('mongoose').model('CommonQuestion');

module.exports = {
  // index method
  index: function(req, res) {
    CommonQuestion.find()
                  .populate('votedYes')
                  .populate('votedNo')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
                    res.json(commonquestion);
                  });
  },

  // create method
  create: function(req, res, next) {
    var new_commonquestion = new CommonQuestion(req.body);

    new_commonquestion.save(function(err) {
      if (err) return res.status(400).send(err);

      res.json(new_commonquestion);
    });
    },

  // showvote method
  showvote: function(req, res) {
    CommonQuestion.find( {canVote: true})
                  .populate('users')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);

                    res.json(commonquestion);

                  });
  },

  // changestatus method
  changestatus: function(req, res, next) {

    // var change_status = new CommonQuestion(req.body);

    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findByIdAndUpdate ( commonquestion_id, req.body, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      res.json(commonquestion);
    })
    },

  // create method

  // dateshow method
  dateshow: function(req, res) {
    var dateshow = req.params.date;
    // var dateshow = "2016-08-20";
    var dateOnly = dateshow.slice(0,10);
    var startDate = dateOnly.concat("T00:00:00.001Z");
    var endDate = dateOnly.concat("T23:59:59.999Z");

    CommonQuestion.find({
      createdAt: { $gte: startDate, $lte: endDate }
    })
                  .populate('users')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
                    res.json(commonquestion);
                  });
  },

  // showyes method
  showyes: function(req, res) {
    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findOne({
      _id: commonquestion_id
    })
                  .populate('votedYes')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
// console.log("arr " + commonquestion.voteYes.length);
                    if ( commonquestion.votedYes.length > 0 ) {
                      var users_arr = commonquestion.votedYes;
                      var users_name_arr = [];
                      console.log(commonquestion.votedYes);

                      users_arr.forEach(function (users) {
                        users_name_arr.push(users.fullName);
                      });


                      res.json(users_name_arr);
                  }
                  else res.end();
                  });
  },

  // voteyes method
  voteyes: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;
    var user_id = req.body.user_id;

    CommonQuestion.findById ( commonquestion_id, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      if (commonquestion) {
        commonquestion.votedYes.push(user_id);
        commonquestion.save(function (err, commonquestion) {
          res.json(commonquestion);
        });
      }

      res.json(commonquestion);
    })
    },

  // showno method
  showno: function(req, res) {
    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findOne({
      _id: commonquestion_id
    })
                  .populate('users')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
                    if ( commonquestion.voteNo.length > 0 ) {
                      res.json(commonquestion);
                  }
                  else res.end();
                  });
  },

  // voteno method
  voteno: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findByIdAndUpdate ( commonquestion_id, req.body, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      res.json(commonquestion);
    });
    },

  // answered method
  answered: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findByIdAndUpdate ( commonquestion_id, req.body, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      res.json(commonquestion);
    });
    },


};
