const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema // ? <-- creating a virtual field on the schema, this is a field that will only exist when creating a new user, and will not be stored in the database.
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function (next) { // ? <-- custom checks to run before mongooses own validate
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match') // ? if password and confirmaton dont match, we invalidate at this point, and the whole process stops, no user created
    }
    next() // ? <-- if all is is good, we allow it through to next (validate)
  })

// ? Validation

userSchema
  .pre('save', function(next) { // ? so we can perform a task before mongoose saves the new user
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) // ? replace their password with the hashed version
    }
    next() // ? let mongoose move on to now save
  })

// ? Save

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
