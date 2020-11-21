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
    .catch((err) => res.status(500).send(err));
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.status(500).send({ message: 'Ошибка!' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
