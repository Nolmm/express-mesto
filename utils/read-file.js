const fsPromisses = require('fs').promises
module.exports = (path) => {
  return fsPromisses.readFile(path, { encoding: 'utf8' })
    .then(data => {
      return JSON.parse(data)
    })
}
