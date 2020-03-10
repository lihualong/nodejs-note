- 文件夹内文件列表 : handlebar 模板
- 文件内容输出
- mime类型响应
- gzip,deflate 压缩
- rang 
  curl -r 0-100 -i http://localhost:5000
- 缓存 强缓存、协商缓存

# 缓存
1 强缓存 命中会返回200
Expires : 绝对时间
Cache-Control： max-age=time（毫秒数，多久之后过期） |no-cache|no-store）

2 协商缓存 命中会返回304
If-Modified-Since(客户端) / Last-Modified(服务端) 。设置date（如果服务器date小于等于客户端请求date则返回304，否则返回修改后的资源））
If-None-Match(客户端) / Etag(服务端)。 w/xxx(xxx的值和上面的etag的xxx一样则返 回304，否则返回修改后的资源)


# cli
package.json  {"bin": {"anywhere": "bin/anywhere"}}
创建bin> anywhere 文件

#! /usr/bin/env node

require('../src/index')


# 版本号
x.y.z   
z: 修改bug
y: 新增功能兼容之前，或者修改bug
x: 大版本，不兼容之前

1.2.* == ~1.2.0  xy保持一样
^2.0.0 == 2.0   x保持一样


# open url


# 发布

npm login
npm publish

