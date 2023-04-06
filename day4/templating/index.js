const pug = require('pug');

const user = { isAdmin: true }

//Méthode renderFile
pug.renderFile('template.pug', { user }, (err, data) => {
  if (err) throw err;
  console.log(data);
})

//Méthode compileFile
let compile = pug.compileFile('template.pug')
console.log(compile({ user }));