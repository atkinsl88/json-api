const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    res.status(422).json(err)
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }) // ? <-- look up the user by the email provided
    if (!user || !user.validatePassword(req.body.password)) { // ? <-- if you cannot find them, or you did find them but their password was wrong
      throw new Error() // ? <-- bye bye no logging in
    }
    const token = jwt.sign( // ? If there password is right, create a token for that user
      { sub: user._id }, // ? <-- bake their user id into the token
      secret, // ? <-- use a random secret string to ecode it
      { expiresIn: '7 days' } // ? <-- set an expriy time for the token
    )
    res.status(202).json({ // ? <-- send them a response, with a nice friendly message and their token
      message: `Welcome back ${user.username}`,
      token
    })
  } catch (err) {
    res.status(401).json({ message: 'Sashay Away' })
  }
}

module.exports = {
  register,
  login
}
