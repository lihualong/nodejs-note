const path = require('path')

const mimeTypes = {
   txt: 'text/plain',
   js: 'application/javascript'
}

module.exports = (filePath) =>{
  let ext = path.extname(filePath).split('.').pop().toLowerCase()
  if(!ext){
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
