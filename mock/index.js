const restapis = require('./home')

module.exports = (app) => {
  for (let key in restapis) {
    const [method = 'get', url = '/'] = (key || 'get /').split(' ')
    app[method](url, restapis[key])
  }
}