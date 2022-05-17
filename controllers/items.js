const Item = require('../models/item')

async function itemsIndex(req, res) {
  const items = await Item.find()
  res.status(200).json(items)
}

async function itemsCreate(req, res) {
  try {
    const createdItem = await Item.create(req.body)
    res.status(201).json(createdItem)
  } catch (err) {
    res.json(err)
  }
}

async function itemsShow(req, res) {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (err) {
    res.json(err)
  }
}

async function itemsEdit(req, res) {
  try {
    const editedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!editedItem) throw new Error()
    res.status(202).json(editedItem)
  } catch (err) {
    res.json(err)
  }
}

async function itemsDelete(req, res) {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  index: itemsIndex,
  create: itemsCreate,
  show: itemsShow,
  edit: itemsEdit,
  delete: itemsDelete
}