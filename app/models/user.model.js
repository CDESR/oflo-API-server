var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

// create User schema that has first_name, last_name, email (must be unique, must be valid email), password (must be longer than 6 characters), password, creates a virtual 'fullname', hash the password before save and an instance method called authenticate that uses bcrypt.compare

var userSchema = new Schema ({

});



mongoose.model('User', UserSchema);
