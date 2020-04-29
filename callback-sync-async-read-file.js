// Syncronous
var fs = require('fs');
var data = fs.readFileSync('input.txt');

console.log(data.toString())
console.log('SYNC: program ended');

// Asyncronous
fs.readFile('input.txt', function(err, data) {
	if (err) return console.error(err)
	console.error(data.toString());
});

console.log('ASYNC: program ended')