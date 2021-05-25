let http = require('http');
let fs = require('fs');
let url = require('url');

let app = http.createServer(function (req, res) {
  console.log(req.url);
  if(req.url.includes('/index')) {
    let query = url.parse(req.url, true).query;
    console.log(query.id);
    let data = fs.readFileSync('./data.json', 'utf-8');
    data = JSON.parse(data);
    console.log(data);
    let list = '';
    data.forEach(function(element,index){
      list = list + `<li><a href = "/index?id=${index}">${element.title}</a></li>`
    });
    console.log(list);
    res.end(`<!doctype html>
    <html>
    <head>
      <title>WEB1 - HTML</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="index.html">WEB</a></h1>
      <ol>
        ${list}
      </ol>
      <h2>${data[query.id].title}</h2>
      <p>${data[query.id].explain}
      </p>
    </body>
    </html>`);
  }
  if(req.url == '/favicon.ico') {
    return res.writeHead(404)
  }
  res.writeHead(200);
});

app.listen(3000);