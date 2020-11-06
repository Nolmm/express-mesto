const path = require('path');

const pathToData = path.join(__dirname, '..', 'data', 'cards.json');
const router = require('express').Router();
const readFile = require('../utils/read-file.js');

const cards = (req, res) => readFile(pathToData)
  .then((data) => res
    .status(200)
    .send(data))
  .catch(() => {
    res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
  });
router.use('/cards', cards);
module.exports = {
  cardRouter: router,
};
