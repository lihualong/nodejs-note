const net = require('net')
const server = net.createServer()
const clients = []
server.on('connection', client => {
  client.write('HI!\n')
  clients.push(client)
  client.on('data', data => {
    console.log('receive', data.toString())
    clients.forEach(v => {
      v.write(data)
    })
  })
})
server.listen(9000)
