const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};
const getUser = (req, res) => {
  const { _id } = req.params;
  // eslint-disable-next-line consistent-return
  User.findOne({ _id })
    .orFail(() => new Error('NotValidId', 'Пользователь не найден'))
    .then((user) => res.status(200).send(user))
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else if (err.name === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else res.status(500).send({ message: 'Ошибка!' });
    });
};
// eslint-disable-next-line max-len
const createUser = (req, res) => User.countDocuments().then((count) => User.create({ count, ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => res.status(500).send(err)));

module.exports = {
  getUsers,
  getUser,
  createUser,
};
