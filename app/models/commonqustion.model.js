var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');

// create a CommonQuestion schema that has the following fields:
// user (that is an array that embeds the document of the user who created this common question)
// common_question(string)
// yes (that is an array that embeds the documents of all the users that voted yes on this question)
// no (that is an array that embeds the documents of all the users that voted no on this question)

var CommonQuestionSchema = new Schema({

});


mongoose.model('CommonQuestion', CommonQuestionSchema);
