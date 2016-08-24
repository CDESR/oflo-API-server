var CommonQuestion = require('mongoose').model('CommonQuestion');

module.exports = {
  // index method
  index: function(req, res) {
    CommonQuestion.find()
                  .sort({createdAt: -1})
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


  // show one method
  show: function (req, res, next) {
    var commonquestion_id = req.params.commonquestion_id;
    CommonQuestion.findById(commonquestion_id, req.body, function (err, commonquestion) {
      if (err) {
        return res.status(400).send(err);
      }
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
    });
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
    // var user_id = req.body.user_id;
    var user_id = req.body.user;

    CommonQuestion.findById ( commonquestion_id, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      if (commonquestion) {
        if (commonquestion.canVote === "true") {
          var voted_yes_before = checkVoted(commonquestion.votedYes, user_id);
          var voted_no_before = checkVoted(commonquestion.votedNo, user_id);

          if (!voted_yes_before && !voted_no_before) {
            // console.log(String(commonquestion.votedYes[0]) === user_id );
            // console.log(commonquestion.votedYes[0].id === user_id);
            commonquestion.votedYes.push(user_id);
            // console.log("Save ", commonquestion)
            commonquestion.save(function (err, commonquestion) {
              res.json(commonquestion);
            });
          }else{
            console.log("Already voted");
            res.send("Already voted")
          }
        }else{
          res.send("Voting closed")
        }



      }

    })
    },

  // showno method
  showno: function(req, res) {
    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findOne({
      _id: commonquestion_id
    })
                  .populate('votedNo')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
                    if ( commonquestion.votedNo.length > 0 ) {
                      var users_arr = commonquestion.votedNo;
                      var users_name_arr = [];
                      console.log(commonquestion.votedNo);

                      users_arr.forEach(function (users) {
                        users_name_arr.push(users.fullName);
                      });


                      res.json(users_name_arr);
                  }
                  else res.end();
                  });
  },

  // voteno method
  voteno: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;
    // var user_id = req.body.user_id;
    var user_id = req.body.user;

    CommonQuestion.findById ( commonquestion_id, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      if (commonquestion) {
        if (commonquestion.canVote === "false") {
          var voted_yes_before = checkVoted(commonquestion.votedYes, user_id);
          var voted_no_before = checkVoted(commonquestion.votedNo, user_id);

          if (!voted_yes_before && !voted_no_before) {
            commonquestion.votedNo.push(user_id);
            commonquestion.save(function (err, commonquestion) {
              res.json(commonquestion);
            });
          }else{
            res.send("Already voted");
          }
        }

      }

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

function checkVoted(voted_arr, user_id) {
  for (var i = 0; i < voted_arr.length; i++) {
    if( String(voted_arr[i]) === user_id){
      return true;
    }
  }
  return false;
}
