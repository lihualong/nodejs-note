const express = require('express')
const proxy = require('http-proxy-middleware')
const fs = require('fs')
const app =  express()

app.get('/',function (req, res) {
  fs.readFile("./index.html", (err, data) => {
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
})
app.use(express.static(__dirname + '/'))
app.use('/api', proxy({target: 'http://localhost:5000', changeOrigin: false}))
module.exports = app

