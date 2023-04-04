const fs = require('fs');

const data = fs.readFileSync('students.txt', 'utf8');

let students = [];

let n = 0;
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
    students.push({
      note: note,
      name: name,
      address: address
    })
    continue;
  } 
}

let sorting = true;
while(sorting){
  sorting = false
  for(let i = 0; i < students.length - 1; i++){
    if(students[i].note < students[i + 1].note){
      let temp = students[i];
      students[i] = students[i + 1];
      students[i + 1] = temp;
      sorting = true;
    }
  }
}

console.log(students)

