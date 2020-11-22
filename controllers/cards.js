const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else res.status(500).send({ message: 'Ошибка!' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
