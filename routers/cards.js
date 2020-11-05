const path = require('path');
const pathToData = path.join(__dirname, '..', 'data', 'cards.json')
const readFile = require('../utils/read-file.js')


const router = require('express').Router();
const cards = (req, res) => readFile(pathToData)
  .then(data => res
    .status(200)
    .send(data))
  .catch(err => {
    res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
  })

router.use('/cards', cards)

module.exports = {
  cardRouter: router
}





