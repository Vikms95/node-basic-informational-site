const http = require('http')
const fs = require('fs')
const path = require('path');

http.createServer((req, res) =>{
  
  // This gets the whole filePath were we can find the document to serve according to the url request
  // If the req.url is '/' this means we are at the root of the page, so the corresponding file is automatically
  // hardcoded   
  let filePath = path.join(__dirname, 'public',
  (req.url === '/' ? 'index.html' : req.url)
  )
  
  // This will be assigned the type of content that the req.url has, depending on its extension name   
  let contentType = 'text/html';
  
  // This gets the extension of the path to check it later
  let extname = path.extname(filePath)
  
  // Check extname and set contenType
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
  
  // If the contenType remains as 'text/html', this means that even though it is not the root of the page, it is another
  // html page that we have to serve, so whatever it is, asisgn it .html as the filePath and serve the corresponding html file
     // This happens because the request URL just gives us the name of the document but without any extension   
  if(contentType === 'text/html' && extname == '') filePath += '.html'


  // With the filepath we got, we not have the document to serve   
  fs.readFile(filePath, (err, content) => {
    if(err){       
      // If no document with the name + extname was found     
      if(err.code === 'ENOENT'){
        // Send the 404.html from our directory         
        fs.readFile(path.join(__dirname, 'public', '404.html'),
        (err, content) => {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end(content, 'utf-8')
        })
      // If other error appears       
      }else{
      // Serve the error         
        res.writeHead(500)
        res.end(`Server error: ${err.code}`)
      }
    }else{
      // Serve the document with the contentType taken by its extension name       
      res.writeHead(200, {'Content-Type': contentType})
      // And the content value taken by fs.readFile       
      res.end(content, 'utf-8')
    }
  })

}).listen(8080)
