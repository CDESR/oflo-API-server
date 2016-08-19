var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');


// create Question schema that has the following fields:
// question_content (string),
// answered (boolean), which is set to default false
// user (that is embedding the document of the user that created this question)

var QuestionSchema = new Schema ({

});

mongoose.model('Question', QuestionSchema);
