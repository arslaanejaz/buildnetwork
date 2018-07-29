var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    email: {type: String, unique: true},
    password: String,
    first_name: String,
    last_name: String,
    gender: String,
    address1: String,
    address2: String,
    city: String,
    zip: String,
    address: String,
    updated_at: { type: Date, default: Date.now }

  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
