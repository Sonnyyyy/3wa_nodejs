const fs = require("fs");
const readline = require("readline");
const students = JSON.parse( fs.readFileSync("./Data/students.json")).students;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt("OHAI> ");
  rl.prompt();
  
  rl.on("line", (line) => {
    if(line == "quit" || line == "exit") rl.close();
    else {
      students.forEach(student => {
        if(line.toLowerCase() == student.name.toLowerCase()){
          let avg = student.notes.reduce((partialSum, a) => partialSum + a, 0) / student.notes.length;
          console.log(student.name + "'s note average is " + avg);
          rl.close();
        }
      })
      console.log("no student with this name was found");
    }
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  });