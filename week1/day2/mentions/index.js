require('dotenv').config();

const students = [
  { name: 'ALAN', note: '11', address: 'Paris', mention : null },
  { name: 'ALICE', note: '17', address: 'Paris', mention : null },
  { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
  { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
  { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
  { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
  { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
  { name: 'SONIA', note: '18', address: 'Paris', mention : null },
  { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
];

for(let student of students) {
  if(student.note >= 10 && student.note < 12){
    student.mention = process.env.p;
    continue;
  }
  else if(student.note >= 12 && student.note < 14){
    student.mention = process.env.ab;
    continue;
  }
  else if(student.note >= 14 && student.note < 16){
    student.mention = process.env.b;
    continue;
  }
  else if(student.note >= 16){
    student.mention = process.env.tb;
    continue;
  }
}

console.table(students);