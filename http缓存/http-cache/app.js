const http = require('http')
const fs = require('fs')
const path = require('path')
const date = 'Fri, 14 Feb 2020 02:21:37 GMT'
const etag =  require("crypto").createHash('sha1').update('123456abcdef').digest('base64');
const app = http.createServer(function (req, res) {
  const {method, url} = req
  console.log(url)
  // 如果是首页
  if (url == '/') {
    fs.readFile(path.join(__dirname, '/public/index.html'), (err, data) => {
      //设置响应头，解决乱码问题
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
      res.end(data)
    })
  }
  /* 强制缓存测试  通过浏览器network size（memory cache）
  *  Cache-Control、 Pragma 和 Expires(http1.0已很少用)   优先级：Pragma>Cache-Control>Expires
  *  强制缓存不会向服务断发请求 客户端显示的为200
  *  Expries 指定的是时间可能时间不统一
  * */

  // Cache-control  ,值为[private|public|max-age|no-cache|no-store]
  // private：客户端可以缓存 public：客户端和代理服务器都可以缓存 max-age=t：缓存内容将在t秒后失效 no-cache：需要使用协商缓存来验证缓存数据 no-store：所有内容都不会缓存
  else if (url == '/js/control.js') {
      res.writeHead(200, {
        'Content-Type': 'text/javascript;charset=utf-8',
        'Cache-Control': 'max-age=10'
      })
      res.end('强制缓存')
  }
  else if (url == '/js/main.js') {
    fs.readFile(path.join(__dirname,'/public/',url),(err,data)=>{
      res.writeHead(200, {
        'Content-Type': 'text/javascript;charset=utf-8',
        'Cache-Control': 'max-age=10'
      })
      res.end(data)
    })
  }
  // Pragma http1.0
  else if (url == '/js/pragma.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript;charset=utf-8',
      'Cache-Control': 'max-age=10',
      'Pragma': 'no-cache' // Pragma 优先于Cache-Control
    })
    res.end('强制缓存')
  }

  /* 协商缓存 Last-Modify Etag
  * 通常服务器是根据文件的修改时间
  * */

  else if(url == '/js/modify.js') {
    /*
        * 使用协商缓存请求
        * */
    if (req.headers["if-modified-since"] === date) {
      res.writeHead(304, "keep cache", {
        'Content-Type': 'text/javascript;charset=utf-8',
       // "Cache-Control": "max-age=10",
        "Cache-Control": "no-cache", // 一直使用协商缓存
        "last-modified": date
      })
      res.end()
    } else {
      res.writeHead(200, "OK", {
        'Content-Type': 'text/javascript;charset=utf-8',
        //"Cache-Control": "max-age=10",
        "Cache-Control": "max-age=10, no-cache", // 一直使用协商缓存
        "last-modified": date
      })
      res.end('协商缓存')
    }

  }
  // Etag
  else if(url == '/js/etag.js') {
    console.log(req.headers["if-none-match"]) // 要小写
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, "keep cache", {
        'Content-Type': 'text/javascript;charset=utf-8',
        "Etag": etag
      })
      res.end()
    } else {
      res.writeHead(200, "OK", {
        'Content-Type': 'text/javascript;charset=utf-8',
        "Etag": etag
      })
      res.end('协商缓存')
    }

  }

  /*
  * vary
  */

  else {
    res.end('404')
  }
})
app.listen(3000)
console.log('server start with port 3000')
