const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const route = require('./help/router')
const openUrl = require('./help/openUrl')
class Server{
  constructor(config) {
    this.config = Object.assign({}, conf, config)
  }
  start(){
    const server = http.createServer((req, res) => {
      const filePath = path.join(conf.root, req.url)
      route(req, res, filePath, this.config)
    })
    server.listen(this.config.port, () => {
      const addr = `http://${this.config.hostname}:${this.config.port}`
      console.info(`server start at ${chalk.blue(addr)} `)
      openUrl(addr)
    })
  }
}


module.exports = Server


