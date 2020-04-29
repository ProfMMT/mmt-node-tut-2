const child_process = require('child_process')

for (var i = 1; i < 8; i++) {
	var workProcess = child_process.fork('child.js', [i, 'a', 'b', 'c'])

	workProcess.on('close', function(code){
		console.log('Child process exited with exit code ' + code)
	});
}