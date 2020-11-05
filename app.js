const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();
const path = require('path');
const { userRouter } = require('./routers/users.js')
const { cardRouter } = require('./routers/cards.js')

app.use(express.static(path.join(__dirname, 'public')));
app.use(userRouter)
app.use(cardRouter)
app.use('*', (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
