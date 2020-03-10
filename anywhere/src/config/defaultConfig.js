module.exports ={
    root: process.cwd(),
    port: 5000,
    compress: /\.(html|css|md|js)$/,
    hostname: 'localhost',
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}
