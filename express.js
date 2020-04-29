var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')
// Create application/x-www-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})
var cookieParser = require('cookie-parser')

var app = express();

app.use(urlencodedParser)
app.use(multer({dest:'/tmp/'}).any()) // For multipart/form-data
app.use(cookieParser())
// Serve static files
app.use(express.static('public'))


// Routing
app.get('/', function(req, res) {
	// console.log(req);
	// console.log(res);
	console.log("Got a GET request for the homepage");
	console.log('Cookies: ', req.cookies)

	// res.send('Hello GET.');
	res.end(JSON.stringify(req.cookies))
});

app.post('/', function(req, res){
	console.log("Got a POST request for the homepage");
    res.send('Hello POST');
});

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('User Listing');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
});

app.get('/form_get', function(req, res){
	res.sendFile(__dirname + "/" + "form-get.htm")
})

app.get('/process_get', function(req, res){
	// Prepare response in JSON format
	response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};

	console.log(response)
	res.end(JSON.stringify(response))
})

app.get('/form_post', function(req, res){
	res.sendFile(__dirname + "/" + "form-post.htm")
})

app.post('/process_post', urlencodedParser, function(req, res){
	// Prepare response in JSON format
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name
	};

	console.log(response)
	res.end(JSON.stringify(response))
})

app.get('/form_upload', function(req, res){
	res.sendFile(__dirname + "/" + "form-upload.htm")
})

app.post('/process_upload', function(req, res){
	console.log(req.files[0].originalname)
	console.log(req.files[0].path)
	console.log(req.files[0].mimetype)

	var file = __dirname + "/uploads/" + req.files[0].originalname
	console.log(file)

	fs.readFile(req.files[0].path, function(err, data){
		fs.writeFile(file, data, function(err, data){
			if (err) {
				console.log(err)
				response = {
					message: 'File upload unsuccessful',
					filename: req.files[0].originalname
				}
			} else {
				response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname,
					path: file
				}
			}
			console.log(response)
			res.end(JSON.stringify(response))
		});
	});
})

var server = app.listen(8081, function(){
	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})