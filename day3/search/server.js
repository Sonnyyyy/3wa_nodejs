const http = require("http");
const hostname = "localhost";
const port = "8000";
const fs = require('fs');
const path = require('path');

const directory = "Data";

const directoryPath = path.join(__dirname, directory);
let searchOptions = "";
fs.readdir(directoryPath, function (err, files) {
  if(err) {
    console.error(err);
  } 
  files.forEach(option => {
    searchOptions += `<option value="` + option + `">` + option.replace(".json", "") + `</option>`
  })
});

const server = http.createServer((req, res) => {

  const url = req.url.replace('/','');

  if(url === 'favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});

    res.end();
    return;
  }

  if(url === '') {
    res.end(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>root</title>
          <script>
            function searchByName(){
              console.log(document.getElementById("search").value)
              window.location.replace("http://localhost:8000/search/" + document.getElementById("search").value);
            }
          </script> 
        </head>
        <body>
          <a href="http://localhost:8000/all">all students</a></br>
          <select id="search">` + searchOptions + `</select>
          <button onclick="searchByName()">Search!</button>
        </body>
      </html>`
    );
  }

  if(url === 'all') {
    fs.readFile(directory + '/all.json', 'utf8', (err, data) => {
      if(err) {
        console.error(err);
        res.end(`<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>all students</title>   
            </head>
            <body>404 not found</body>
          </html>`
        );
      }
      else res.end(`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>all students</title>   
          </head>
          <body>
            <p>` + data + `</p>
          </body>
        </html>`
      );
    });
  }
  else if(url.split('/')[0] === 'search') {
    fs.readFile(directory + "/" + url.split('/')[1], 'utf8', (err, data) => {
      if(err) {
        console.error(err);
        res.end(`<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>student</title>   
            </head>
            <body>404 not found</body>
          </html>`
        );
      }
      else res.end(`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>student</title>   
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
