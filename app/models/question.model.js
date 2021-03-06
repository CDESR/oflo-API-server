var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');


// create Question schema that has the following fields:
var QuestionSchema = new mongoose.Schema({
  question_content:
  {
    type: String,
    trim: true,
    required: [true, 'Question content is required'],
    validate: [
      function(question) {
        return question.length <= 80;
      },
      'Question is too long'
    ]
  },
  answered: { type: Boolean, default: false },
  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});
// question_content (string),
// answered (boolean), which is set to default false
// user (that is embedding the document of the user that created this question)

QuestionSchema.set('timestamps', {});
var Question = mongoose.model('Question', QuestionSchema);
module.export = Question;
