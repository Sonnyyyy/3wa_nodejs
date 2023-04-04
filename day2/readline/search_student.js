var readline = require('readline');

rl = readline.createInterface(process.stdin, process.stdout);
const students = ["Alan", "Sonia", "Sophie"];

rl.setPrompt('name>');
rl.prompt();

rl.on('line', line => {
  students.forEach(student => {
    if(line.toLowerCase() == student.toLowerCase()){
      console.log("selected " + student);
      rl.close();
    }
  })
  console.log("no student with this name was found");
  rl.prompt();
}).on('close', () => {
  process.exit(0);
})