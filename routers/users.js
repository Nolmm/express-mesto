const path = require('path');
const pathToData = path.join(__dirname, '..', 'data', 'users.json')
const readFile = require('../utils/read-file.js')

const router = require('express').Router();
const users = (req, res) => readFile(pathToData)
  .then(data => res
    .status(200)
    .send(data))
  .catch(err => {
    res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
  })


const usersId = (req, res) => {
  const { _id } = req.params;
  readFile(pathToData)
    .then(data => {
      const user = data.find(item => {
        return item._id === _id
      })
      if (!user) {
        return res.status(404).send({ "message": "Нет пользователя с таким id" });
      }
      res.send(user)
    })
    .catch(err => {
      res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
    })
}



router.get('/users', users);
router.get('/users/:_id', usersId)
module.exports = {
  userRouter: router,
};
