var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

// create User schema that has first_name, last_name, email (must be unique, must be valid email), password (must be longer than 6 characters), password, creates a virtual 'fullname', hash the password before save and an instance method called authenticate that uses bcrypt.compare

var userSchema = new Schema ({
  first_name: {
    type: String,
    trim: true,
    required: true

  },
  last_name:{
    type: String,
    trim: true,
    required: true

  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Email is invalid']
  },
  password: {
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 4;
      },
      'Password is too short'
    ]
  },
  admin: {
    type: Boolean,
    default: true
  }

});


userSchema.pre('save', function(next) {
  var user = this;

  // generate the bcrypt salt
  bcrypt.genSalt(5, function(err, salt) {
    if(err) return next(err);

    // create the hash ==> plain password text + salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.

        user.password = hash;
        next();
    });
  });
});

userSchema.methods.auth = function(posted_password, callback) {
  console.log('posted_password is: ' + posted_password);

  // comparing
  // 1st arg = posted password from req.body
  // 2nd arg = hashed password from the db
  // 3rd arg = is the callback
  bcrypt.compare( posted_password, this.password, function(err, is_match) {
    callback(null, is_match);
  });
};


// set a virtual attributes
userSchema.virtual('fullName')
.get(function() {
     return this.first_name + ' ' + this.last_name; // getting the virtual attributes on json view
// .set(function(fullName) {
//   var splitName = fullName.split(' ');
//   this.first_name = splitName[0] || '';
//   this.last_name = splitName[1] || '';
}); // allowing virtual attributes to interact with actual mongo attr

//register the getter and virtual modifiers
userSchema.set('toJSON', { virtuals: true});
userSchema.set('timestamps', {}); // default timestamps by default


mongoose.model('User', userSchema);
