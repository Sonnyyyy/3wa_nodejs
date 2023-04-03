const fs = require('fs');

const data = fs.readFileSync('students.txt', 'utf8');

let students = [];

let i = 0, n = 0;
let note, name, address;
for(let value of data.split(/[.,\/ -]/)){
  if(Number(value) && n == 0){
    note = +value;
    n++;
    continue;
  }
  if(n == 1){
    name = value;
    n++;
    continue;
  } 
  if(n == 2){
    address = value;
    n = 0;
    i++;
    students.push({
      note: note,
      name: name,
      address: address
    })
    continue;
  } 
}

console.log(students)

