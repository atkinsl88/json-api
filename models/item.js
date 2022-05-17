const mongoose = require('mongoose')

// * Create your Schema here
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true  },
  type: { type: String, required: true, unique: false  },
  value: { type: Number, required: true },
  use: { type: String, required: true, unique: true  },
  additionalUse: { type: String, required: true, unique: false  },
  image: { type: String, required: true }
})

// * Register your Schema as a model here
module.exports = mongoose.model('Item', itemSchema)