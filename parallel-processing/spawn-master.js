const child_process = require('child_process')

for (var i = 1; i < 11; i++) {
	var workProcess = child_process.spawn('node', ['child.js', i, 'a', 'b', 'c'])

	workProcess.stdout.on('data', function(data){
		console.log('stdout: ' + data)
	})

	workProcess.stderr.on('data', function(data){
		console.log('stderr: ' + data)
	})

	workProcess.on('close', function(code){
		console.log('Child process exited with exit code ' + code)
	});
}