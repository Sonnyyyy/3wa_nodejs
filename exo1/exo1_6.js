const fs = require('fs');

fs.appendFile('students.txt', "\n18 SONIA Paris \r\n17 CLARISSE Marseille \r", (err) => {
  if(err) throw err;
});