const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    // eslint-disable-next-line consistent-return
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Данные не найдены' });
      }
      res.send(data);
    });
};
const createCard = (req, res) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректный запрос' });
      } else {
        res.status(500).send({ message: 'Ошибка!' });
      }
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(new Error('NotValidId', 'Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.name === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else res.status(500).send({ message: 'Ошибка!' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
