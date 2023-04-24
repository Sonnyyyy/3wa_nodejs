exports.formatStudent = function(body){
  const replacer = new RegExp(/\+/, "g");
  const name = body.toString().split(/&/)[0].split(/=/).pop().replace(replacer, ' ');
  const birth = body.toString().split(/&/)[1].split(/=/).pop().replace(replacer, ' ');
  const _method = body.toString().split(/&/)[2].split(/=/).pop().replace(replacer, ' ');

  if(name && birth && _method) return {name: name, birth: birth, _method: _method};
}