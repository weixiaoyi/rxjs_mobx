module.exports = {
  'get /mock/example': (req, res) => {
    res.json({
      data: [
        { name: '3' },
        { name: '4' }
      ],
      ret: 0
    })
  }
}




