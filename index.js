const http = require('http')
const fs = require('fs')
const path = require('path');

http.createServer((req, res) =>{
  let filePath = path.join(__dirname, 'public',
  (req.url === '/' ? 'index.html' : req.url)
  )
  let contentType = 'text/html';

  let extname = path.extname(filePath)
  // Check ext and set content type
  switch(extname){
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType ='application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }
  
  if(contentType === 'text/html' && extname == '') filePath += '.html'
  // Other html files do not have an extname?


  fs.readFile(filePath, (err, content) => {
    if(err){
      if(err.code === 'ENOENT'){
        fs.readFile(path.join(__dirname, 'public', '404.html'),
        (err, content) => {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end(content, 'utf-8')
        })
      }else{
        res.writeHead(500)
        res.end(`Server error: ${err.code}`)
      }
    }else{
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content, 'utf-8')
    }
  })

}).listen(8080)