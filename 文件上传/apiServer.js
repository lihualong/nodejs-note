const http = require('http')

const app = http.createServer(function (req, res) {
  const {method, url} = req
  if (url == '/api/users') {
    if (method == 'OPTIONS') {
      console.log('options')
      res.end()
    } else if (method == 'GET') {
      console.log('get')
      res.end(JSON.stringify({name: 'helo', age: 1}))
    }
  }
  else {
    res.setHeader('status',405)
    res.end()
  }

})
module.exports = app
