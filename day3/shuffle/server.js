const http = require("http");
const shuffle = require("./src/utils").shuffle;
const hostname = "localhost";
const port = "8000";

const users = [
  'Alan',
  'Sophie',
  'Bernard',
  'Elie'
];

const server = http.createServer((req, res) => {

  const url = req.url.replace('/','');

  if (url === 'favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});

    res.end();
    return;
  }

  if (url === '') {
    res.end(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>root</title>   
        </head>
        <body>
          <p>` + users + `</p>
        </body>
      </html>`
    );
  }

  if (url === 'shuffle') {
    shuffle(users);
    res.end(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>shuffle</title>   
        </head>
        <body>
          <p>` + users + `</p>
        </body>
      </html>`
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running ate http://${hostname}:${port}/`);
});

