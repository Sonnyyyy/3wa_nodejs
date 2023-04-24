require('dotenv').config();
const http = require('http');
const fs = require('fs');
const dayjs = require('dayjs');
const utils = require('./utils');

const hostname = process.env.APP_LOCALHOST;
const port = process.env.APP_PORT;

const students = [
  { name : "Sonia", birth : "2019-14-05"},
  { name : "Antoine", birth : "2000-12-05"},
  { name : "Alice", birth : "1990-14-09"},
  { name : "Sophie", birth : "2001-10-02"},
  { name : "Bernard", birth : "1980-21-08"}
];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  if(url === "style") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/style.css");
    res.write(css);
    res.end();

      return;
  }

  if(req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    })

    req.on("end", () => {
      let formatedStudent = utils.formatStudent(body);
      if(formatedStudent._method == "POST"){
        students.push(formatedStudent);
        res.writeHead(201, { Location: `http://${hostname}:${port}`});
        res.end();
      }
      else if (formatedStudent._method == "DELETE"){
        for(let i = 0; i <= students.length; i++){
          if(students[i].name == formatedStudent.name && students[i].birth == formatedStudent.birth){
            students.splice(i, 1);
            break;
          }
        }
        res.writeHead(201, { Location: `http://${hostname}:${port}/users`});
        res.end();
      }
    });
  }

  if(url === "") {
    const home = fs.readFileSync("./view/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  }

  if(url === "users") {
    res.writeHead(200, {"Content-Type" : "text/html"});

    let users = "<ul>";
    for(const student of students){
      let birth = dayjs(student.birth).format('DD/MM/YYYY')
      users += `<li>
        <form method="POST" action="/#">
          ${student.name} ${birth}
          <input type="hidden" name="name" value="${student.name}">
          <input type="hidden" name="birth" value="${student.birth}">
          <input type="hidden" name="_method" value="DELETE">
          <button type="submit">x</button>
        </form>
      </li>`
    }
    users += "</ul>";

    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Liste des étudiants</title>
          <link href="/style" rel="stylesheet" type="text/css"/>
          <script>//function remove(e){ e.remove(); }</script>
        </head>
        <body>
          <div class="container">
            <p>
              <a href="http://${hostname}:${port}">Home</a>
              <a href="/users">Users</a>
            </p></br></br>
            ${users}
          </div>
        </body>    
      </html>
    `);
  };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})