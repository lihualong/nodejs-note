const Server= require('./app')

const yargs = require('yargs')

const argv = yargs
  .usage('anywhere [options]')
  .option('p',{
    alias: 'port',
    describe: '端口号'
  })
  .option('r',{
    alias: 'root',
    describe: 'root path'
  })
  .version()
  .alias('v','1')
  .help()
  .argv;

const server = new Server(argv)
server.start()
