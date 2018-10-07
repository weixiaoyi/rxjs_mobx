const helper = require('./helper')

module.exports = {
  'get /mock/example1': (req, res) => {
    helper.delay(2000, () => {
      res.json({
        data: [
          { name: '3' },
          { name: '4' }
        ],
        ret: 0
      })
    })

  },
  'get /mock/example2': (req, res) => {
    helper.delay(4000, () => {
      res.json({
        data: [
          { name: '5' },
          { name: '6' }
        ],
        ret: 0
      })
    })
  }
}




