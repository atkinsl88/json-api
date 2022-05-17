const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Item = require('../models/item')
const itemData = require('./data/items')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err, db) => {

    if (err) { // * if anything goes wrong connecting, just log error and stop
      console.log(err)
      return
    }

    try {

      await db.dropDatabase() // * empty the database of all previous data

      console.log('Database Dropped 👍')

      const items = await Item.create(itemData) // * We re create all that data

      console.log(`${items.length} Items created`)

      await mongoose.connection.close() // * close the connection to the database

      console.log('Goodbye 👋')

    } catch (err) {

      await mongoose.connection.close()

      console.log(err) // * if anything goes wrong after connecting, just log error and stop
    }
  })
