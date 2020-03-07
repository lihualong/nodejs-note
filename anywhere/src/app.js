const http = require('http')
const config = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const server = http.createServer((req, res) => {
   const filePath = path.join(config.root, req.url)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(filePath)
})

server.listen(config.port, ()=>{
    const addr = `http://${config.hostnae}:${config.port}`
    console.info(`server start at ${chalk.blue(addr)} `)
})
