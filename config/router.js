const router = require('express').Router()
const items = require('../controllers/items')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/items')
  .get(items.index)
  .post(secureRoute, items.create)

router.route('/items/:id')
  .get(items.show)
  .put(secureRoute, items.edit)
  .delete(secureRoute, items.delete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

module.exports = router