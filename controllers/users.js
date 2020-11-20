const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};
const getUser = (req, res) => {
  const { _id } = req.params;
  // eslint-disable-next-line consistent-return
  User.findOne({ _id }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  });
};
// eslint-disable-next-line max-len
const createUser = (req, res) => User.countDocuments().then((count) => User.create({ id: count, ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => res.status(400).send(err)));

module.exports = {
  getUsers,
  getUser,
  createUser,
};
