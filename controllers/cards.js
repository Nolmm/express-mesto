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
    .catch((err) => res.status(400).send(err));
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
