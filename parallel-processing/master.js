const child_process = require('child_process')

for (var i = 0; i < 3; i++) {
	var workProcess = child_process.exec('node child.js ' + i + ' a b c', function(err, stdout, stderr){
		if(err){
			console.log(err.stack)
			console.log('Error code: ' + err.code)
			console.log('Signal received: ' + err.signal)
		}

		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
	});

	workProcess.on('exit', function(code){
		console.log('Child process exited with exit code ' + code)
	});
}