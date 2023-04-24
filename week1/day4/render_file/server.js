const http = require("http");
const fs = require('fs');

const hostname = 'localhost';
const port = 8000;

const students = [
  { name : "Sonia"},
  { name : "Antoine"}
];

const server = http.createServer((req, res) => {

  const url = req.url.replace('/','');

  if(url === 'favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    return;
  }

  if(url === '') {
    const home = fs.readFileSync("./view/home.html");
    res.end(home);
    return;
  }

  if(url === 'users') {
    res.end(`<!DOCTYPE html>
      <html>
      
      <head>
        <meta charset="utf-8">
        <title>Liste des utilisateurs</title>
        <link href="/bootstrap" rel="stylesheet" type="text/css" />
      </head>
      
      <body>
        <div class="container">` + JSON.stringify(students) + `</div>
      </body>
      
      </html>`);
    return;
  }

  if(req.method === 'POST') {
    // Handle post info...
    let body = students;
    req.on('data', data => {
        body.push(data);
    });
  
    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end( JSON.stringify({ "result" : body }));
    });
  }
  
  if(url === 'bootstrap') {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();
  
    return;
  }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})