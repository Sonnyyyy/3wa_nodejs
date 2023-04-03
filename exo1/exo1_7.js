const fs = require('fs');

const data = fs.readFileSync('students.txt', 'utf8');

let values = data.split(" ")
let n = 0;
for(let i = 0; i < values.length; i++){
  if(Number(values[i]) && n == 0){
    values[i + 1] = values[i + 1].toUpperCase();
    continue;
  }
}

let students = values.join(" ");
fs.writeFile('students.txt', students, (err) => {
  if(err) throw err;
});