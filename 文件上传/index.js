const api = require('./apiServer')
const proxy = require('./proxyServer')
api.listen(5000)
proxy.listen(4000)
