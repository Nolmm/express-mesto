const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};
const getUser = (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .orFail(() => new Error('NotValidId', 'Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else res.status(500).send({ message: 'Ошибка!' });
    });
};
const createUser = (req, res) => User.create(req.body)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректный запрос' });
    } else {
      res.status(500).send({ message: 'Ошибка!' });
    }
  });

module.exports = {
  getUsers,
  getUser,
  createUser,
};
