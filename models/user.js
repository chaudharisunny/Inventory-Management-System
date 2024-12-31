const mongoose = require('mongoose');
const crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt:{
        type:String
        
    }
},{timestamps:true});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
  
    // Generate a random salt
    this.salt = crypto.randomBytes(16).toString('hex');
  
    // Hash the password with the salt using pbkdf2Sync
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
  
    next();
  });
  
  // Instance method to verify passwords
  userSchema.methods.verifyPassword = function (password) {
    // Hash the provided password with the stored salt
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hash;
  };
module.exports = mongoose.model('user', userSchema);
