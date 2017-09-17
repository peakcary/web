const http = require('http')

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('hello')
}).listen(8081)

console.log('service runing on http://localhost:8081')