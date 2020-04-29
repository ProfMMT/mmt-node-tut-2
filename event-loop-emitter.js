var events = require('events');
var fs = require('fs');

var eventEmitter = new events.EventEmitter();
var connectHandler = function connected(){
	console.log('connection successful.');
	// Fire read_data event
	eventEmitter.emit('read_data');
}

var readDataHandler = function readData(){
	fs.readFile('input.txt', function(err, data) {
		if (err) return console.error(err)

		eventEmitter.emit('data_received', data);
	});
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('read_data', readDataHandler);

eventEmitter.on('data_received', function(data){
	console.log('data received successfully.');
	console.log(data.toString());
});

// Fire the connection event
eventEmitter.emit('connection');

console.log('Program Ended.')