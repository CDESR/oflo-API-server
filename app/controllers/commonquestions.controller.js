var CommonQuestion = require('mongoose').model('CommonQuestion');

module.exports = {
  // index method
  index: function(req, res) {
    CommonQuestion.find()
                  .populate('users')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
console.log(commonquestion);
                    res.json(commonquestion);
                  });
  },

  // create method
  create: function(req, res, next) {
    var new_commonquestion = new CommonQuestion(req.body);

    new_commonquestion.save(function(err) {
      if (err) return res.status(400).send(err);

      res.json(new_commonquestion);
    })
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
                  .populate('users')
                  .exec(function(err, commonquestion) {
                    if (err) res.status(400).send(err);
// console.log("arr " + commonquestion.voteYes.length);
                    if ( commonquestion.voteYes.length > 0 ) {
                      res.json(commonquestion);
                  }
                  else res.end();
                  });
  },

  // voteyes method
  voteyes: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findByIdAndUpdate ( commonquestion_id, req.body, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

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
    })
    },

  // answered method
  answered: function(req, res, next) {

    var commonquestion_id = req.params.commonquestion_id;

    CommonQuestion.findByIdAndUpdate ( commonquestion_id, req.body, function(err, commonquestion) {
      if (err) return res.status(400).send(err);

      res.json(commonquestion);
    })
    },

  // commonquestion_by_id method

  // commonquestions_by_date method

};
