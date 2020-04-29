var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({extended:false, limit:'20mb'})
var urlencodedParser = bodyParser.urlencoded({extended:false})

var app = express()

app.use(jsonParser)
app.use(urlencodedParser)

app.get('/listUsers', function(req, res){
	fs.readFile(__dirname  + '/users.json', 'utf8', function(err, data){
		console.log(data)
		res.end(data)
	})
})

app.get('/form_user', function(req, res){
	res.sendFile(__dirname + "/" + "form-user.htm")
})

//Accepts all formats of form data
app.post('/addUser', function(req, res){
	user = req.body
	console.log(user)

	var file = __dirname + '/users.json'

	// Read existing users
	fs.readFile(file, function(err, data){
		if (err) {
			res.end('Error occurred')
			return
		}

		var users = JSON.parse(data)
		user.id = parseInt(user.id)
		users['user' + user.id] = user

		// Append the user to users.json
		fs.writeFile(file, JSON.stringify(users, null, 4), 'utf8', function(err){
			if(err){
				res.end('Failed adding the new user')
				return
			}
		})

		console.log(users)
		res.json(users)
	})
})

app.get('/user/:id', function(req, res){
	fs.readFile(__dirname + "/users.json", 'utf8', function(err, data){
		var users = JSON.parse(data)
		var user = users['user' + req.params.id]

		if(!user){
			res.end('User not found')
			return
		}

		console.log(user)
		res.json(user);
	});
})

app.delete('/deleteUser', function(req, res){
	user_id = req.body.id
	console.log(user_id)

	if (!user_id) {
		res.end('ID is required')
		return
	}

	var file = __dirname + '/users.json'

	// Read existing users
	fs.readFile(file, function(err, data){
		if (err) {
			res.end('Error occurred')
			return
		}

		var users = JSON.parse(data)

		if (!users['user' + user_id]) {
			res.end('No user with ID ' + user_id)
			return
		}

		delete users['user' + user_id]

		// Write remaining users to users.json
		fs.writeFile(file, JSON.stringify(users, null, 4), 'utf8', function(err){
			if(err){
				res.end('Failed deleting the user')
				return
			}
		})

		console.log(users)
		users['msg'] = 'User with ID ' + user_id + ' deleted successfully!'
		res.json(users)
	})
})

var server = app.listen(8081, function(){
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})