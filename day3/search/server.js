const http = require("http");
const hostname = "localhost";
const port = "8000";
const fs = require('fs');

const directory = "Data";

const server = http.createServer((req, res) => {

  const url = req.url.replace('/','');

  if(url === 'favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});

    res.end();
    return;
  }

  if(url === 'all') {
    fs.readFile(directory + '/all.json', 'utf8', (err, data) => {
      if(err) {
        console.error(err);
        return;
      }
      res.end(`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>root</title>   
          </head>
          <body>
            <p>` + data + `</p>
          </body>
        </html>`
      );
    });
  }

  if(url.split('/')[0] === 'search') {
    fs.readFile(directory + "/" + url.split('/')[1], 'utf8', (err, data) => {
      if(err) {
        console.error(err);
        return;
      }
      res.end(`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>shuffle</title>   
          </head>
          <body>
            <p>` + data + `</p>
          </body>
        </html>`
      );
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running ate http://${hostname}:${port}/`);
});
